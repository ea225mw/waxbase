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

  #albumTitle
  #store
  #price
  #releaseYear
  #origReleaseYear
  #imgURLHidden

  /**
   * Called when the component that inherits from this class is added to DOM.
   */
  connectedCallback() {
    this.#baseURLClient = baseURLClient
    /* ---------- REFERENCES ---------- */
    this.#formatId = this.shadowRoot.querySelector('select[name="formatId"]')

    this.#releaseYear = this.shadowRoot.querySelector('input[name="releaseYear"]')
    this.#origReleaseYear = this.shadowRoot.querySelector('input[name="origReleaseYear"]')

    this.#imgURLHidden = this.shadowRoot.querySelector('input[name="imgURL"]')
    this.#albumEditForm = this.shadowRoot.querySelector('#albumEditForm')
    this.#albumTitle = this.shadowRoot.querySelector('input[name="albumTitle"]')
    this.#store = this.shadowRoot.querySelector('input[name="store"]')
    this.#price = this.shadowRoot.querySelector('input[name="price"]')

    /* ---------- EVENT LISTENERS ------------------------------------------------------------------------- */

    this.#albumEditForm.addEventListener('input', () => {
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

  get allArtists() {
    return this.#allArtists
  }

  get allFormats() {
    return this.#allFormats
  }

  get allConditions() {
    return this.#allConditions
  }

  get allStores() {
    return this.#allStores
  }

  get baseURLClient() {
    return this.#baseURLClient
  }

  get formatId() {
    return this.#formatId
  }

  get releaseYear() {
    return this.#releaseYear
  }

  get origReleaseYear() {
    return this.#origReleaseYear
  }

  get imgURLHidden() {
    return this.#imgURLHidden
  }

  get albumEditForm() {
    return this.#albumEditForm
  }

  get albumTitle() {
    return this.#albumTitle
  }

  get store() {
    return this.#store
  }

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
      this.shadowRoot.querySelectorAll('.tab').forEach((t) => t.classList.remove('selected-tab'))
      tab.classList.add('selected-tab')
      const formToBeViewed = event.target.dataset.tab
      this.shadowRoot.querySelectorAll('.forms').forEach((f) => f.classList.remove('selected-form'))
      this.shadowRoot.querySelector(`#${formToBeViewed}`).classList.add('selected-form')
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
