import { EditRecordBaseClass } from './editRecordBaseClass.js'
import { cssTemplate } from './wb-edit-record.css.js'
import { htmlTemplate } from './wb-edit-record.html.js'
import '../wb-edit-record/wb-tracks-edit/wb-tracks-edit.js'
import '../wb-edit-record/wb-artist-suggestions/wb-artist-suggestions.js'
import { renderTemplates, getFieldMap } from '../../commonMethods.js'

const pathToModule = import.meta.url
const defaultImagePath = new URL('./images/default.svg', pathToModule)

customElements.define(
  'wb-edit-record',
  /**
   *
   */
  class extends EditRecordBaseClass {
    #cancel
    #submit
    #tabsDiv
    #recordIndexHiddenInput
    #tracksTab
    #wbTracksEdit
    #wbDetailsEdit
    #wbArtistSuggestions
    artistInput
    artistIdHidden

    /**
     * Creates a new instance of the wb-edit-record web component.
     */
    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
      renderTemplates(cssTemplate, htmlTemplate, this.shadowRoot)
    }

    /**
     * Called when the component is added to DOM.
     */
    connectedCallback() {
      super.connectedCallback()

      // SETTING UP REFERENCES
      this.#cancel = this.shadowRoot.querySelector('#cancel')
      this.#submit = this.shadowRoot.querySelector('#submit')
      this.#tabsDiv = this.shadowRoot.querySelector('#tabsDiv')
      this.#recordIndexHiddenInput = this.shadowRoot.querySelector('#recordIndex')
      this.#tracksTab = this.shadowRoot.querySelector('#tracks')
      this.#wbTracksEdit = this.shadowRoot.querySelector('wb-tracks-edit')
      this.#wbDetailsEdit = this.shadowRoot.querySelector('wb-details-edit')

      this.#wbArtistSuggestions = document.createElement('wb-artist-suggestions')
      this.shadowRoot.querySelector('#tempTestDiv').append(this.#wbArtistSuggestions)
      // console.log(this.#wbArtistSuggestions)

      this.artistInput = this.#wbArtistSuggestions.artistInput
      this.artistIdHidden = this.#wbArtistSuggestions.artistIdHidden

      /* ---------- EVENT LISTENERS ---------- */
      this.#cancel.addEventListener('click', () => this.cancel())
      this.#submit.addEventListener('click', (event) => this.submit(event))
      this.#tabsDiv.addEventListener('click', (event) => this.swapToAnotherTab(event))
    }

    /**
     * Displays this edit view component. Called every time the user clicks on a record in the record table.
     *
     * @param {number} recordIndex - The index of the record to be displayed.
     */
    async showEditView(recordIndex) {
      const response = await fetch(`${this.baseURLClient}records/viewSingleAlbum`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: recordIndex
        })
      })

      const record = await response.json()

      await this.createFormatOptions(record)
      this.formatId.value = String(record.formatId)

      this.#wbArtistSuggestions.setAllArtists(this.allArtists)

      this.#wbDetailsEdit.setConditionOptions(this.allConditions)
      this.#wbDetailsEdit.configureComponent(record)

      this.#tracksTab.append(this.#wbTracksEdit)

      this.populateForm(record)
      // this.#albumEditForm.setAttribute('method', 'POST')
      this.#recordIndexHiddenInput.setAttribute('value', recordIndex)

      this.style.display = 'block'
      document.body.style.pointerEvents = 'none'
      this.style.pointerEvents = 'auto'
    }

    /**
     * Populates the edit form with all the record data.
     *
     * @param {object} record - The record object.
     */
    populateForm(record) {
      const fieldMap = getFieldMap(this)

      for (const key in fieldMap) {
        let valueFromRecord = record[key] // Example: valueFromRecord = record.price

        if (valueFromRecord) {
          // If value is an object instead of a string:
          if (typeof valueFromRecord === 'object' && valueFromRecord !== null) {
            if (key === 'store') {
              this.store.dataset.id = record.storeId
              valueFromRecord = valueFromRecord.storeName
            } else if (key === 'artist') {
              valueFromRecord = valueFromRecord.displayName
              this.#wbArtistSuggestions.artistInput.dataset.id = record.artistId
            }
          }
          fieldMap[key].value = valueFromRecord // Example: this.#price.value = record.price
        } else {
          fieldMap[key].value = ''
        }
      }
      if (record.tracks) {
        this.#wbTracksEdit.populateTracks(record.tracks)
      }
      this.shadowRoot.querySelector('#frontCover').src = record.imgURL || defaultImagePath
    }

    /**
     * Submits the form to web server.
     *
     * @param {Event} event - The event dispatched from the clicking the OK button.
     */
    async submit(event) {
      event.preventDefault()
      let isFormValid = true

      const hasInvalidField = this.#checkForInvalidFields()

      if (hasInvalidField) {
        isFormValid = false
      }

      const formData = this.#gatherFormData()

      if (isFormValid) {
        const response = await fetch(`${this.baseURLClient}records/save`, {
          method: 'POST',
          body: formData
        })

        if (!response.ok) {
          const error = await response.json()
          console.log(error.errors[0].message, error.errors[0].path)
        }

        const album = await response.json() // Get the updated album fresh from the database and send in an event.
        this.dispatchEvent(
          new CustomEvent('albumUpdated', {
            detail: {
              updatedAlbum: album
            }
          })
        )
        this.cancel()
      }
    }

    #checkForInvalidFields() {
      const allInputFields = this.albumEditForm.querySelectorAll('input[data-valid]')
      const hasInvalidField = Array.from(allInputFields).some((element) => this.checkForInvalidFields(element))
      return hasInvalidField
    }

    #gatherFormData() {
      const formData = new FormData(this.albumEditForm)
      const tracks = this.#wbTracksEdit.prepareTracksForSubmission()
      formData.append('tracks', JSON.stringify(tracks))
      if (this.#wbTracksEdit.tracksToBeRemoved.length > 0) {
        formData.append('tracksToBeRemoved', JSON.stringify(this.#wbTracksEdit.tracksToBeRemoved))
      }
      return formData
    }
  }
)
