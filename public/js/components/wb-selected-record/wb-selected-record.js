import '../wb-edit-record/wb-edit-record.js'
import { cssTemplate } from './wb-selected-record.css.js'
import { htmlTemplate } from './wb-selected-record.html.js'
import { renderTemplates } from '../../commonMethods.js'
import { baseURLClient } from '../../config/variables.js'

const pathToModule = import.meta.url
const defaultImagePath = new URL('./images/default.svg', pathToModule)

customElements.define(
  'wb-selected-record',
  /**
   * A web component for a selected record view, used in WaxBase.
   */
  class extends HTMLElement {
    #albumCover
    #albumTitle
    #artist
    #tracksTable
    #editBtn
    #deleteBtn
    #currentRecordIndex = null
    #format
    #store
    #price
    #mediaCondition
    #sleeveCondition
    #releaseYear
    #origReleaseYear
    #confirmDeleteDiv
    #baseURLClient

    /**
     * Creates a new instance of the wb-selected-record web component.
     */
    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
      renderTemplates(cssTemplate, htmlTemplate, this.shadowRoot)
      this.#baseURLClient = baseURLClient
    }

    /**
     * Called when the component is added to DOM.
     */
    connectedCallback() {
      /* ---------- SETTING UP REFERENCES ---------- */
      this.#albumCover = this.shadowRoot.querySelector('img')
      this.#albumTitle = this.shadowRoot.querySelector('#albumTitle')
      this.#artist = this.shadowRoot.querySelector('#artist')
      this.#tracksTable = this.shadowRoot.querySelector('#tracksTable')
      this.#editBtn = this.shadowRoot.querySelector('#editBtn')
      this.#deleteBtn = this.shadowRoot.querySelector('#deleteBtn')
      this.#format = this.shadowRoot.querySelector('#format')
      this.#store = this.shadowRoot.querySelector('#store')
      this.#price = this.shadowRoot.querySelector('#price')
      this.#mediaCondition = this.shadowRoot.querySelector('#mediaCondition')
      this.#sleeveCondition = this.shadowRoot.querySelector('#sleeveCondition')
      this.#releaseYear = this.shadowRoot.querySelector('#releaseYear')
      this.#origReleaseYear = this.shadowRoot.querySelector('#origReleaseYear')
      this.#confirmDeleteDiv = this.shadowRoot.querySelector('#confirmDeleteDiv')

      /* ---------- SETTING UP EVENT LISTENERS ---------- */
      this.#editBtn.addEventListener('click', () => {
        this.#confirmDeleteDiv.setAttribute('style', 'transform: scaleY(0)')
        this.dispatchEvent(
          new CustomEvent('showEditView', {
            detail: {
              id: this.#currentRecordIndex
            }
          })
        )
      })

      this.#deleteBtn.addEventListener('click', () => {
        this.shadowRoot.querySelector('#confirmDeleteTitle').textContent = `${this.#albumTitle.textContent}`
        this.#confirmDeleteDiv.setAttribute('style', 'transform: scaleY(1)')
      })

      this.shadowRoot.querySelector('#cancelConfirm').addEventListener('click', () => {
        this.#confirmDeleteDiv.setAttribute('style', 'transform: scaleY(0)')
      })

      this.shadowRoot.querySelector('#submitConfirm').addEventListener('click', () => {
        this.deleteRecord()
      })
    }

    /**
     * Sets the record data to be viewed.
     *
     * @param {JSON} record - A JSON object with record information.
     */
    showSelectedRecord(record) {
      this.#confirmDeleteDiv.setAttribute('style', 'transform: scaleY(0)')

      this.shadowRoot.querySelector('#singleRecordWrapper').style.visibility = 'visible'
      this.#currentRecordIndex = record.id

      this.#albumCover.src = record.imgURL || defaultImagePath

      // Values correspons to HTML elements in template.
      const fieldMap = {
        artist: this.#artist,
        albumTitle: this.#albumTitle,
        format: this.#format,
        store: this.#store,
        price: this.#price,
        mediaCondition: this.#mediaCondition,
        sleeveCondition: this.#sleeveCondition,
        releaseYear: this.#releaseYear,
        origReleaseYear: this.#origReleaseYear
      }

      for (const key in fieldMap) {
        let value = record[key] // Example: value = record.price

        if (value) {
          // If value is an object instead of a string:
          if (typeof value === 'object' && value !== null) {
            if (key === 'format') {
              value = value.format // Example: record.format = record.format.format
            } else if (key === 'store') {
              value = value.storeName
            } else if (key === 'artist') {
              value = value.displayName || [value.firstName, value.lastName].filter(Boolean).join(' ')
            } else if (key === 'mediaCondition' || key === 'sleeveCondition') {
              value = value.conditionName
            }
          }

          fieldMap[key].textContent = value // Example: this.#price.textContent = record.price
        } else {
          fieldMap[key].textContent = '-'
        }
      }

      if (record.tracks) {
        this.createTracks(record)
      } else {
        this.#tracksTable.innerHTML = null
      }
    }

    /**
     * Creates tracks in tracks table.
     *
     * @param {JSON} record - A JSON object with record information.
     */
    createTracks(record) {
      this.#tracksTable.innerHTML = null

      Object.values(record.tracks).forEach((track) => {
        const [trackRow, indexTD, titleTD, timeTD] = ['tr', 'td', 'td', 'td'].map((tag) => document.createElement(tag))

        indexTD.textContent = `${track.trackIndex}.`
        titleTD.textContent = track.trackTitle

        let minutes = ''
        let seconds = ''
        if (track.minutes || track.minutes === 0) {
          minutes = `${track.minutes}`
        }
        if (track.seconds || track.seconds === 0) {
          seconds = `${track.seconds}`
        }
        if (minutes !== '' || seconds !== '') {
          const time = `${minutes}:${String(seconds).padStart(2, '0')}`
          timeTD.textContent = time
        } else {
          timeTD.textContent = ''
        }

        trackRow.append(indexTD, titleTD, timeTD)
        this.#tracksTable.append(trackRow)
      })
    }

    /**
     * Contacts the server and deletes the record in the database.
     * Dispatches a custom event to update record table.
     */
    async deleteRecord() {
      const response = await fetch(`${this.#baseURLClient}records/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: this.#currentRecordIndex
        })
      })
      if (response.ok) {
        this.#confirmDeleteDiv.style.transform = 'scaleY(0)'
        this.dispatchEvent(
          new CustomEvent('recordDeleted', {
            detail: {
              id: this.#currentRecordIndex
            }
          })
        )
        this.shadowRoot.querySelector('#singleRecordWrapper').style.visibility = 'hidden'
      }
      const obj = await response.text()
      console.log(obj)
    }
  }
)
