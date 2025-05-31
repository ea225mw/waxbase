import { validateSeconds, validateMinutes } from '../../config/validations.js'
import { baseURLClient } from '../../config/variables.js'

/**
 * Defines a class with common methods for the wb-edit-record and wb-new-record components.
 */
export class EditRecordBaseClass extends HTMLElement {
  #albumEditForm
  #allArtists
  #allFormats
  #allConditions
  #allStores
  #baseURLClient
  #formatId
  #artistSuggestionsList
  #artistInput
  #artistIdHidden
  #storeSuggestionsList
  #storeInput
  #storeIdHidden
  #releaseYear
  #origReleaseYear
  #imgURLHidden
  #addTrackBtn
  #removeTrackBtn
  #tracksWrapper
  #removeTrackConfirmDiv
  #removeTrackConfirmMsg
  #removeTrackCancel
  #removeTrackSubmit
  #tracksToBeRemoved = []

  /**
   * Called when the component that inherits from this class is added to DOM.
   */
  async connectedCallback () {
    this.#baseURLClient = baseURLClient
    /* ---------- REFERENCES ---------- */
    this.#formatId = this.shadowRoot.querySelector('select[name="formatId"]')
    this.#artistSuggestionsList = this.shadowRoot.querySelector('#artistSuggestions')
    this.#artistInput = this.shadowRoot.querySelector('input[name="artist"]')
    this.#artistIdHidden = this.shadowRoot.querySelector('#artistIdHidden')
    this.#storeSuggestionsList = this.shadowRoot.querySelector('#storeSuggestions')
    this.#storeInput = this.shadowRoot.querySelector('input[name="store"]')
    this.#releaseYear = this.shadowRoot.querySelector('input[name="releaseYear"]')
    this.#origReleaseYear = this.shadowRoot.querySelector('input[name="origReleaseYear"]')
    this.#storeIdHidden = this.shadowRoot.querySelector('#storeIdHidden')
    this.#imgURLHidden = this.shadowRoot.querySelector('input[name="imgURL"]')
    this.#addTrackBtn = this.shadowRoot.querySelector('#addTrackBtn')
    this.#removeTrackBtn = this.shadowRoot.querySelector('#removeTrackBtn')
    this.#tracksWrapper = this.shadowRoot.querySelector('#tracksWrapper')
    this.#albumEditForm = this.shadowRoot.querySelector('#albumEditForm')
    this.#removeTrackConfirmDiv = this.shadowRoot.querySelector('#removeTrackConfirmDiv')
    this.#removeTrackConfirmMsg = this.shadowRoot.querySelector('#removeTrackConfirmMsg')
    this.#removeTrackCancel = this.shadowRoot.querySelector('#removeTrackCancel')
    this.#removeTrackSubmit = this.shadowRoot.querySelector('#removeTrackSubmit')

    /* ---------- EVENT LISTENERS ------------------------------------------------------------------------- */
    this.#artistInput.addEventListener('input', () => {
      this.listenForArtistInput()
    })

    this.#artistSuggestionsList.addEventListener('click', event => {
      if (event.target.tagName === 'LI') {
        this.artistInput.value = event.target.textContent
        this.#artistIdHidden.value = event.target.dataset.id
        this.artistSuggestionsList.innerHTML = ''
      }
    })

    this.#storeInput.addEventListener('input', () => {
      this.listenForStoreInput()
    })

    this.#storeSuggestionsList.addEventListener('click', event => {
      if (event.target.tagName === 'LI') {
        this.#storeInput.value = event.target.textContent
        this.#storeIdHidden.value = event.target.dataset.id
        this.#storeSuggestionsList.innerHTML = ''
      }
    })

    this.#addTrackBtn.addEventListener('click', () => {
      this.createAnotherTrack()
    })
    this.#removeTrackBtn.addEventListener('click', () => {
      if (this.#tracksWrapper.lastElementChild) {
        this.#removeTrackConfirmMsg.textContent = `Do you want to delete track "${this.#tracksWrapper.lastElementChild.querySelector('.trackTitle').value}"?`
        this.#removeTrackConfirmDiv.style.display = 'block'
      }
    })
    this.#removeTrackCancel.addEventListener('click', (event) => {
      event.preventDefault()
      this.#removeTrackConfirmDiv.style.display = 'none'
    })
    this.#removeTrackSubmit.addEventListener('click', (event) => {
      event.preventDefault()
      if (this.#tracksWrapper.lastElementChild.dataset.id) {
        this.#tracksToBeRemoved.push(this.#tracksWrapper.lastElementChild.dataset.id)
      }
      this.#tracksWrapper.lastElementChild.remove()
      this.#removeTrackConfirmDiv.style.display = 'none'
    })

    this.tracksWrapper.addEventListener('input', (event) => {
      if (event.target.matches('.secondsField')) {
        const valid = validateSeconds(event.target.value)
        this.setRedBorders(valid, event.target)
      }
      if (event.target.matches('.minutesField')) {
        const valid = validateMinutes(event.target.value)
        this.setRedBorders(valid, event.target)
      }
    })

    this.#albumEditForm.addEventListener('input', (event) => {
      const allInputFields = this.shadowRoot.querySelectorAll('input[data-valid]')
      for (const element of allInputFields) {
        const notValid = this.checkForInvalidFields(element)
        if (notValid) {
          this.shadowRoot.querySelector('#validationFailMsg').style.display = 'block'
          break
        } else {
          this.shadowRoot.querySelector('#validationFailMsg').style.display = 'none'
        }
      }
    })
  }

  /**
   * Getter for #allArtists.
   *
   * @returns {object} - An object with all artists in the database.
   */
  get allArtists () {
    return this.#allArtists
  }

  /**
   * Getter for #allFormats.
   *
   * @returns {object} - The #allFormats object.
   */
  get allFormats () {
    return this.#allFormats
  }

  /**
   * Getter for #allConditions.
   *
   * @returns {Array} - An array of all conditions.
   */
  get allConditions () {
    return this.#allConditions
  }

  /**
   * Getter for #allStores.
   *
   * @returns {Array} - An array of all stores.
   */
  get allStores () {
    return this.#allStores
  }

  /**
   * Getter for #baseURLClient.
   *
   * @returns {string} - The base URL.
   */
  get baseURLClient () {
    return this.#baseURLClient
  }

  /**
   * Getter for #formatId.
   *
   * @returns {HTMLSelectElement} - name="formatId".
   */
  get formatId () {
    return this.#formatId
  }

  /**
   * Getter for #artistInput.
   *
   * @returns {HTMLInputElement} - name="artist".
   */
  get artistInput () {
    return this.#artistInput
  }

  /**
   * Getter for #releaseYear.
   *
   * @returns {HTMLInputElement} - name="releaseYear".
   */
  get releaseYear () {
    return this.#releaseYear
  }

  /**
   * Getter for #origReleaseYear.
   *
   * @returns {HTMLInputElement} - name="origReleaseYear".
   */
  get origReleaseYear () {
    return this.#origReleaseYear
  }

  /**
   * Getter for #suggestionsList.
   *
   * @returns {HTMLUListElement} - id artistSuggestions.
   */
  get artistSuggestionsList () {
    return this.#artistSuggestionsList
  }

  /**
   * Getter for #suggestionsList.
   *
   * @returns {HTMLUListElement} - id artistSuggestions.
   */
  get artistIdHidden () {
    return this.#artistIdHidden
  }

  /**
   * Getter for #suggestionsList.
   *
   * @returns {HTMLUListElement} - id="artistSuggestions".
   */
  get storeIdHidden () {
    return this.#storeIdHidden
  }

  /**
   * Getter for #imgURLHidden.
   *
   * @returns {HTMLInputElement} - input[name="imgURL"]
   */
  get imgURLHidden () {
    return this.#imgURLHidden
  }

  /**
   * Getter for #addTrackBtn.
   *
   * @returns {HTMLButtonElement} - id="addTrackBtn"
   */
  get addTrackBtn () {
    return this.#addTrackBtn
  }

  /**
   * Getter for #tracksWrapper.
   *
   * @returns {HTMLDivElement} - The tracksWrapper div element.
   */
  get tracksWrapper () {
    return this.#tracksWrapper
  }

  /**
   * Getter for #albumEditForm.
   *
   * @returns {HTMLFormElement} - The albumEditForm form element.
   */
  get albumEditForm () {
    return this.#albumEditForm
  }

  /**
   * Getter for #tracksToBeRemoved.
   *
   * @returns {Array} - An array with tracks to be removed from record.
   */
  get tracksToBeRemoved () {
    return this.#tracksToBeRemoved
  }

  /**
   * Sets all common collection data (fetched in index.js) to variables.
   *
   * @param {Array} artists - The artists array.
   * @param {Array} formats - The formats array.
   * @param {Array} conditions - The conditions array.
   * @param {Array} stores - The stores array.
   */
  setCommonRecordData (artists, formats, conditions, stores) {
    this.#allArtists = artists
    this.#allFormats = formats
    this.#allConditions = conditions
    this.#allStores = stores
  }

  /**
   * Displays a new part of the edit form (a new tab).
   *
   * @param {Event} event - The click event.
   */
  changeFormView (event) {
    const tab = event.target.closest('.tab')
    if (tab !== null) {
      this.shadowRoot.querySelectorAll('.tab').forEach(t => t.classList.remove('selected-tab'))
      tab.classList.add('selected-tab')
      const formToBeViewed = event.originalTarget.dataset.tab
      this.shadowRoot.querySelectorAll('.forms').forEach(f => f.classList.remove('selected-form'))
      this.shadowRoot.querySelector(`#${formToBeViewed}`).classList.add('selected-form')
    }
  }

  /**
   * Creates option elements for all record formats in the database.
   * Also sets the saved record format option.
   *
   * @param {object} record - The record object.
   */
  async createFormatOptions (record) {
    this.allFormats.forEach((format) => {
      const option = document.createElement('option')
      option.value = format.id
      option.textContent = format.format
      this.#formatId.append(option)
    })
  }

  /**
   * Creates option elements for all record CONDITIONS in the database.
   *
   * @param {object} record - The record object.
   */
  async createConditionOptions (record) {
    this.#allConditions.forEach((condition) => {
      const option = document.createElement('option')
      option.value = condition.id
      option.textContent = condition.conditionName
      this.shadowRoot.querySelector('select[name="mediaConditionId"]').append(option)
      const optionCopy = option.cloneNode(true)
      this.shadowRoot.querySelector('select[name="sleeveConditionId"]').append(optionCopy)
    })
  }

  /**
   * Adds another track to the tracklist with empty fields for the user to fill.
   */
  createAnotherTrack () {
    const lastTrack = this.#tracksWrapper.lastElementChild
    let lastIndex = 0
    if (lastTrack !== null) {
      lastIndex = lastTrack.querySelector('.trackIndexDiv').dataset.trackIndex
    }
    const [div, trackIndex, trackTitleField, trackMinutesField, trackSecondsField] = ['div', 'div', 'input', 'input', 'input'].map(tag => document.createElement(tag))

    div.classList.add('editTracksContainer')

    trackIndex.textContent = `${parseInt(lastIndex) + 1}.`
    trackIndex.classList.add('trackIndexDiv')
    trackIndex.dataset.trackIndex = `${parseInt(lastIndex) + 1}`

    trackTitleField.classList.add('trackTitle')
    trackMinutesField.classList.add('minutesField')
    trackSecondsField.classList.add('secondsField')
    trackMinutesField.dataset.valid = 'true'
    trackSecondsField.dataset.valid = 'true'

    div.append(trackIndex, trackTitleField, trackMinutesField, trackSecondsField)
    this.shadowRoot.querySelector('#tracksWrapper').append(div)
    div.querySelector('.trackTitle').focus()
  }

  /**
   * Populates a suggestions list when typing in the artist field.
   */
  listenForArtistInput () {
    const query = this.#artistInput.value.toLowerCase()
    const matches = this.allArtists.filter(artist =>
      `${artist.fullName}`.toLowerCase().includes(query)
    )

    this.#artistSuggestionsList.innerHTML = ''
    matches.forEach(artist => {
      const li = document.createElement('li')
      if (artist.the === null && artist.firstName === null) {
        li.textContent = `${artist.lastName}`
      } else if (artist.the === null && artist.firstName !== null) {
        li.textContent = `${artist.firstName} ${artist.lastName}`
      } else if (artist.the === 'The') {
        li.textContent = `${artist.the} ${artist.lastName}`
      }
      li.dataset.id = artist.id
      this.#artistSuggestionsList.appendChild(li)
    })
  }

  /**
   * Populates a suggestions list when typing in the store field.
   */
  listenForStoreInput () {
    const query = this.#storeInput.value.toLowerCase()
    const matches = this.allStores.filter(store =>
      `${store.storeName}`.toLowerCase().includes(query)
    )
    this.#storeSuggestionsList.innerHTML = ''
    matches.forEach(store => {
      const li = document.createElement('li')
      li.textContent = `${store.storeName}`
      li.dataset.id = store.id
      this.#storeSuggestionsList.appendChild(li)
    })
  }

  /**
   * Prepares all tracks into an array before submission to the server.
   *
   * @returns {Array} - The tracks array.
   */
  prepareTracksForSubmission () {
    const tracks = []

    const allEditTracksContainers = this.shadowRoot.querySelectorAll('.editTracksContainer')
    allEditTracksContainers.forEach((trackContainer) => {
      const track = {}
      track.id = trackContainer.dataset.id
      track.trackIndex = trackContainer.querySelector('.trackIndexDiv').dataset.trackIndex
      track.trackTitle = trackContainer.querySelector('.trackTitle').value
      track.minutes = trackContainer.querySelector('.minutesField').value
      track.seconds = trackContainer.querySelector('.secondsField').value
      tracks.push(track)
    })
    return tracks
  }

  /**
   * Used in submit() for checking if there are any invalid input fields.
   *
   * @param {HTMLInputElement} element - The input element to be checked.
   * @returns {boolean} - True/false.
   */
  checkForInvalidFields (element) {
    return element.dataset.valid !== 'true'
  }

  /**
   * Sets red borders to the input fields that doesn't pass validation.
   *
   * @param {boolean} valid - True/false.
   * @param {HTMLInputElement} field - The validated input field.
   */
  setRedBorders (valid, field) {
    if (!valid) {
      field.style.border = '2px solid red'
      field.style.color = 'red'
      field.dataset.valid = false
    } else {
      field.style.border = 'solid black 1px'
      field.style.color = 'black'
      field.dataset.valid = true
    }
  }

  /**
   * Cancels the editing and removes the edit view component.
   */
  cancel () {
    document.body.style.pointerEvents = ''
    this.remove()
  }
}
