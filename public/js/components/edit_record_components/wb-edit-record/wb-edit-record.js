import { cssTemplate } from './wb-edit-record.css.js'
import { htmlTemplate } from './wb-edit-record.html.js'
import '../wb-general-edit/wb-general-edit.js'
import '../wb-tracks-edit/wb-tracks-edit.js'
import '../wb-details-edit/wb-details-edit.js'
import { renderTemplates } from '../../../commonMethods.js'

const pathToModule = import.meta.url
const defaultImagePath = new URL('./images/default.svg', pathToModule)

customElements.define(
  'wb-edit-record',

  class extends HTMLElement {
    #cancel
    #submit
    #tabsDiv
    #recordIndexHiddenInput
    #wbTracksEdit
    #wbDetailsEdit
    #wbGeneralEdit

    // #fieldMap

    // #allStores
    // #allArtists
    // #allFormats
    // #allConditions

    // #formatId
    #albumEditForm

    imgURLHidden

    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
      renderTemplates(cssTemplate, htmlTemplate, this.shadowRoot)
      // this.#createChildComponents()
    }

    /**
     * Called when the component is added to DOM.
     */
    connectedCallback() {
      // SETTING UP REFERENCES
      this.#cancel = this.shadowRoot.querySelector('#cancel')
      this.#submit = this.shadowRoot.querySelector('#submit')
      this.#tabsDiv = this.shadowRoot.querySelector('#tabsDiv')
      this.#recordIndexHiddenInput = this.shadowRoot.querySelector('#recordIndex')
      this.#wbTracksEdit = this.shadowRoot.querySelector('wb-tracks-edit')
      this.#wbDetailsEdit = this.shadowRoot.querySelector('wb-details-edit')
      this.#wbGeneralEdit = this.shadowRoot.querySelector('wb-general-edit')

      this.#albumEditForm = this.shadowRoot.querySelector('#albumEditForm')

      this.imgURLHidden = this.shadowRoot.querySelector('input[name="imgURL"]')

      /* ---------- EVENT LISTENERS ---------- */
      this.#cancel.addEventListener('click', () => this.cancel())
      this.#submit.addEventListener('click', (event) => this.submit(event))
      this.#tabsDiv.addEventListener('click', (event) => this.swapToAnotherTab(event))
    }

    /* -------------------- METHODS -------------------- */
    // #createChildComponents() {
    //   this.#wbDetailsEdit = document.createElement('wb-details-edit')
    //   this.#appendChildComponents()
    // }

    #configureChildComponents(record) {
      // this.#wbDetailsEdit.setConditionOptions(this.#allConditions)
      this.#wbDetailsEdit.populateComponentWithRecordData(record)
      this.#wbGeneralEdit.populateComponentWithRecordData(record)
    }

    setCommonRecordData(artists, formats, conditions, stores) {
      this.#wbGeneralEdit.allArtists = artists
      this.#wbGeneralEdit.allFormats = formats
      this.#wbGeneralEdit.allStores = stores
      // this.#allArtists = artists
      // this.#allFormats = formats
      this.#wbDetailsEdit.setConditionOptions(conditions)
      // this.#allStores = stores
    }

    showEditViewForSelectedRecord(record) {
      // this.#wbGeneralEdit.setFormatId(String(record.formatId))
      this.#recordIndexHiddenInput.value = record.id

      this.#configureChildComponents(record)
      this.#populateForm(record)

      this.setDisplayToBlock()
      this.#setPointerEvents()
    }

    setDisplayToBlock() {
      this.style.display = 'block'
    }

    #setPointerEvents() {
      document.body.style.pointerEvents = 'none'
      this.style.pointerEvents = 'auto'
    }

    #populateForm(record) {
      // this.#populateBasicFields(record)
      // this.#populateArtist(record)
      // this.#populateStore(record)
      this.#populateTracks(record)
      this.#populateCoverImage(record)
    }

    #populateTracks(record) {
      if (record.tracks) {
        this.#wbTracksEdit.populateTracks(record.tracks)
      }
    }

    #populateCoverImage(record) {
      const cover = this.shadowRoot.querySelector('#frontCover')
      cover.src = record.imgURL || defaultImagePath
    }

    #checkForInvalidFields() {
      const allInputFields = this.#albumEditForm.querySelectorAll('input[data-valid]')
      const hasInvalidField = Array.from(allInputFields).some((element) => this.checkForInvalidFields(element))
      return hasInvalidField
    }

    #gatherFormData() {
      const formData = new FormData(this.#albumEditForm)
      console.log(formData)
      const tracks = this.#wbTracksEdit.prepareTracksForSubmission()
      formData.append('tracks', JSON.stringify(tracks))
      if (this.#wbTracksEdit.tracksToBeRemoved.length > 0) {
        formData.append('tracksToBeRemoved', JSON.stringify(this.#wbTracksEdit.tracksToBeRemoved))
      }
      return formData
    }

    swapToAnotherTab(event) {
      const tab = event.target.closest('.tab')
      if (tab !== null) {
        this.shadowRoot.querySelectorAll('.tab').forEach((t) => t.classList.remove('selected-tab'))
        tab.classList.add('selected-tab')
        const formToBeViewed = event.target.dataset.tab
        this.shadowRoot.querySelectorAll('.forms').forEach((f) => f.classList.remove('selected-form'))
        this.shadowRoot.querySelector(`#${formToBeViewed}`).classList.add('selected-form')
      }
    }

    cancel() {
      document.body.style.pointerEvents = ''
      this.remove()
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
  }
)
