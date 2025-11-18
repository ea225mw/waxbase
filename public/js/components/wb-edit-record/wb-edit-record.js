//import { EditRecordBaseClass } from './editRecordBaseClass.js'
import { cssTemplate } from './wb-edit-record.css.js'
import { htmlTemplate } from './wb-edit-record.html.js'
import '../wb-edit-record/wb-tracks-edit/wb-tracks-edit.js'
import '../wb-edit-record/wb-artist-suggestions/wb-artist-suggestions.js'
import '../wb-edit-record/wb-store-suggestions/wb-store-suggestions.js'
import '../wb-edit-record/wb-details-edit/wb-details-edit.js'
import { renderTemplates, getFieldMap } from '../../commonMethods.js'

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

    #wbArtistSuggestions
    artistInput
    artistIdHidden

    #wbStoreSuggestions
    storeInput
    storeIdHidden

    #fieldMap

    #allArtists
    #allFormats
    #allConditions
    #allStores

    #formatId
    #albumEditForm

    albumTitle
    price
    releaseYear
    origReleaseYear
    imgURLHidden

    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
      renderTemplates(cssTemplate, htmlTemplate, this.shadowRoot)
      this.#createChildComponents()
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

      this.artistInput = this.#wbArtistSuggestions.artistInput
      this.artistIdHidden = this.#wbArtistSuggestions.artistIdHidden

      this.storeInput = this.#wbStoreSuggestions.storeInput
      this.storeIdHidden = this.#wbStoreSuggestions.storeIdHidden

      this.#formatId = this.shadowRoot.querySelector('select[name="formatId"]')

      this.#albumEditForm = this.shadowRoot.querySelector('#albumEditForm')
      this.albumTitle = this.shadowRoot.querySelector('input[name="albumTitle"]')
      this.releaseYear = this.shadowRoot.querySelector('input[name="releaseYear"]')
      this.origReleaseYear = this.shadowRoot.querySelector('input[name="origReleaseYear"]')
      this.price = this.shadowRoot.querySelector('input[name="price"]')
      this.imgURLHidden = this.shadowRoot.querySelector('input[name="imgURL"]')

      this.#fieldMap = getFieldMap(this)
      /* ---------- EVENT LISTENERS ---------- */
      this.#cancel.addEventListener('click', () => this.cancel())
      this.#submit.addEventListener('click', (event) => this.submit(event))
      this.#tabsDiv.addEventListener('click', (event) => this.swapToAnotherTab(event))
    }

    /* -------------------- METHODS -------------------- */
    #createChildComponents() {
      this.#wbArtistSuggestions = document.createElement('wb-artist-suggestions')
      this.#wbStoreSuggestions = document.createElement('wb-store-suggestions')
      this.#wbDetailsEdit = document.createElement('wb-details-edit')
      this.#appendChildComponents()
    }

    #appendChildComponents() {
      this.shadowRoot.querySelector('#artistComponentWrapper').append(this.#wbArtistSuggestions)
      this.shadowRoot.querySelector('#storeComponentWrapper').append(this.#wbStoreSuggestions)
      this.shadowRoot.querySelector('#detailsComponentWrapper').append(this.#wbDetailsEdit)
    }

    #configureChildComponents(record) {
      this.#wbArtistSuggestions.setAllArtists(this.#allArtists)
      this.#wbStoreSuggestions.setAllStores(this.#allStores)

      this.#wbDetailsEdit.setConditionOptions(this.#allConditions)
      this.#wbDetailsEdit.populateComponentWithRecordData(record)
    }

    setCommonRecordData(artists, formats, conditions, stores) {
      this.#allArtists = artists
      this.#allFormats = formats
      this.#allConditions = conditions
      this.#allStores = stores
    }

    createFormatOptions() {
      this.#allFormats.forEach((format) => {
        const option = document.createElement('option')
        option.value = format.id
        option.textContent = format.format
        this.#formatId.append(option)
      })
    }

    showEditViewForSelectedRecord(record) {
      this.createFormatOptions(record)
      this.#formatId.value = String(record.formatId)
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
      this.#populateBasicFields(record)
      this.#populateArtist(record)
      this.#populateStore(record)
      this.#populateTracks(record)
      this.#populateCoverImage(record)
    }

    #populateBasicFields(record) {
      for (const key in this.#fieldMap) {
        let value = record[key]
        if (!value) {
          this.#fieldMap[key].value = ''
          continue
        }
        if (['artist', 'store'].includes(key)) continue

        this.#fieldMap[key].value = value
      }
    }

    #populateArtist(record) {
      if (record.artist) {
        this.#wbArtistSuggestions.artistInput.value = record.artist.displayName
        this.#wbArtistSuggestions.artistIdHidden.value = record.artistId
      }
    }

    #populateStore(record) {
      if (record.store) {
        this.#wbStoreSuggestions.storeInput.value = record.store.storeName
        this.#wbStoreSuggestions.storeIdHidden.value = record.storeId
      }
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
