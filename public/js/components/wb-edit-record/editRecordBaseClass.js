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
  #albumTitle
  #store
  #price
  #releaseYear
  #origReleaseYear
  #imgURLHidden

  /**
   * Called when the component that inherits from this class is added to DOM.
   */
  async connectedCallback() {
    this.#baseURLClient = baseURLClient
    /* ---------- REFERENCES ---------- */
    this.#formatId = this.shadowRoot.querySelector('select[name="formatId"]')
    this.#artistSuggestionsList =
      this.shadowRoot.querySelector('#artistSuggestions')
    this.#artistInput = this.shadowRoot.querySelector(
      'input[name="artistDisplayName"]'
    )
    this.#artistIdHidden = this.shadowRoot.querySelector('#artistIdHidden')
    this.#storeSuggestionsList =
      this.shadowRoot.querySelector('#storeSuggestions')
    this.#storeInput = this.shadowRoot.querySelector('input[name="store"]')
    this.#releaseYear = this.shadowRoot.querySelector(
      'input[name="releaseYear"]'
    )
    this.#origReleaseYear = this.shadowRoot.querySelector(
      'input[name="origReleaseYear"]'
    )
    this.#storeIdHidden = this.shadowRoot.querySelector('#storeIdHidden')
    this.#imgURLHidden = this.shadowRoot.querySelector('input[name="imgURL"]')
    this.#albumEditForm = this.shadowRoot.querySelector('#albumEditForm')
    this.#albumTitle = this.shadowRoot.querySelector('input[name="albumTitle"]')
    this.#store = this.shadowRoot.querySelector('input[name="store"]')
    this.#price = this.shadowRoot.querySelector('input[name="price"]')

    /* ---------- EVENT LISTENERS ------------------------------------------------------------------------- */
    this.#artistInput.addEventListener('input', () => {
      this.listenForArtistInput()
    })

    this.#storeInput.addEventListener('input', () => {
      this.listenForStoreInput()
    })

    this.#artistSuggestionsList.addEventListener('click', (event) => {
      if (event.target.tagName === 'LI') {
        this.artistInput.value = event.target.textContent
        this.#artistIdHidden.value = event.target.dataset.id
        this.artistSuggestionsList.innerHTML = ''
      }
    })

    this.#storeSuggestionsList.addEventListener('click', (event) => {
      if (event.target.tagName === 'LI') {
        this.#storeInput.value = event.target.textContent
        this.#storeIdHidden.value = event.target.dataset.id
        this.#storeSuggestionsList.innerHTML = ''
      }
    })

    this.#albumEditForm.addEventListener('input', () => {
      const allInputFields =
        this.shadowRoot.querySelectorAll('input[data-valid]')
      for (const element of allInputFields) {
        const notValid = this.checkForInvalidFields(element)
        if (notValid) {
          this.shadowRoot.querySelector('#validationFailMsg').style.display =
            'block'
          break
        } else {
          this.shadowRoot.querySelector('#validationFailMsg').style.display =
            'none'
        }
      }
    })
  }

  /**
   * Getter for #allArtists.
   *
   * @returns {object} - An object with all artists in the database.
   */
  get allArtists() {
    return this.#allArtists
  }

  /**
   * Getter for #allFormats.
   *
   * @returns {object} - The #allFormats object.
   */
  get allFormats() {
    return this.#allFormats
  }

  /**
   * Getter for #allConditions.
   *
   * @returns {Array} - An array of all conditions.
   */
  get allConditions() {
    return this.#allConditions
  }

  /**
   * Getter for #allStores.
   *
   * @returns {Array} - An array of all stores.
   */
  get allStores() {
    return this.#allStores
  }

  /**
   * Getter for #baseURLClient.
   *
   * @returns {string} - The base URL.
   */
  get baseURLClient() {
    return this.#baseURLClient
  }

  /**
   * Getter for #formatId.
   *
   * @returns {HTMLSelectElement} - name="formatId".
   */
  get formatId() {
    return this.#formatId
  }

  /**
   * Getter for #artistInput.
   *
   * @returns {HTMLInputElement} - name="artist".
   */
  get artistInput() {
    return this.#artistInput
  }

  /**
   * Getter for #releaseYear.
   *
   * @returns {HTMLInputElement} - name="releaseYear".
   */
  get releaseYear() {
    return this.#releaseYear
  }

  /**
   * Getter for #origReleaseYear.
   *
   * @returns {HTMLInputElement} - name="origReleaseYear".
   */
  get origReleaseYear() {
    return this.#origReleaseYear
  }

  /**
   * Getter for #suggestionsList.
   *
   * @returns {HTMLUListElement} - id artistSuggestions.
   */
  get artistSuggestionsList() {
    return this.#artistSuggestionsList
  }

  /**
   * Getter for #suggestionsList.
   *
   * @returns {HTMLUListElement} - id artistSuggestions.
   */
  get artistIdHidden() {
    return this.#artistIdHidden
  }

  /**
   * Getter for #suggestionsList.
   *
   * @returns {HTMLUListElement} - id="artistSuggestions".
   */
  get storeIdHidden() {
    return this.#storeIdHidden
  }

  /**
   * Getter for #imgURLHidden.
   *
   * @returns {HTMLInputElement} - input[name="imgURL"]
   */
  get imgURLHidden() {
    return this.#imgURLHidden
  }

  /**
   * Getter for #albumEditForm.
   *
   * @returns {HTMLFormElement} - The albumEditForm form element.
   */
  get albumEditForm() {
    return this.#albumEditForm
  }

  /**
   * Getter for #albumTitle.
   *
   * @returns {HTMLInputElement} - input[name="albumTitle"]
   */
  get albumTitle() {
    return this.#albumTitle
  }

  /**
   * Getter from #store.
   *
   * @returns {HTMLInputElement} - input[name="store"]
   */
  get store() {
    return this.#store
  }

  /**
   * Getter for #price.
   *
   * @returns {HTMLInputElement} - input[name="price"]
   */
  get price() {
    return this.#price
  }

  /**
   * Sets all common collection data (fetched in index.js) to variables.
   *
   * @param {Array} artists - The artists array.
   * @param {Array} formats - The formats array.
   * @param {Array} conditions - The conditions array.
   * @param {Array} stores - The stores array.
   */
  setCommonRecordData(artists, formats, conditions, stores) {
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
  swapToAnotherTab(event) {
    const tab = event.target.closest('.tab')
    if (tab !== null) {
      this.shadowRoot
        .querySelectorAll('.tab')
        .forEach((t) => t.classList.remove('selected-tab'))
      tab.classList.add('selected-tab')
      const formToBeViewed = event.target.dataset.tab
      this.shadowRoot
        .querySelectorAll('.forms')
        .forEach((f) => f.classList.remove('selected-form'))
      this.shadowRoot
        .querySelector(`#${formToBeViewed}`)
        .classList.add('selected-form')
    }
  }

  /**
   * Creates option elements for all record formats in the database.
   * Also sets the saved record format option.
   *
   * @param {object} record - The record object.
   */
  async createFormatOptions() {
    this.allFormats.forEach((format) => {
      const option = document.createElement('option')
      option.value = format.id
      option.textContent = format.format
      this.#formatId.append(option)
    })
  }

  /**
   * Populates a suggestions list when typing in the artist field.
   */
  listenForArtistInput() {
    const query = this.#artistInput.value.toLowerCase()
    const matches = this.allArtists.filter((artist) =>
      `${artist.fullName}`.toLowerCase().includes(query)
    )

    this.#artistSuggestionsList.innerHTML = ''
    matches.forEach((artist) => {
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
  listenForStoreInput() {
    const query = this.#storeInput.value.toLowerCase()
    const matches = this.allStores.filter((store) =>
      `${store.storeName}`.toLowerCase().includes(query)
    )
    this.#storeSuggestionsList.innerHTML = ''
    matches.forEach((store) => {
      const li = document.createElement('li')
      li.textContent = `${store.storeName}`
      li.dataset.id = store.id
      this.#storeSuggestionsList.appendChild(li)
    })
  }

  /**
   * Used in submit() for checking if there are any invalid input fields.
   *
   * @param {HTMLInputElement} element - The input element to be checked.
   * @returns {boolean} - True/false.
   */
  checkForInvalidFields(element) {
    return element.dataset.valid !== 'true'
  }

  /**
   * Cancels the editing and removes the edit view component.
   */
  cancel() {
    document.body.style.pointerEvents = ''
    this.remove()
  }
}
