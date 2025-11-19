import { htmlTemplate, trackRowTemplate, tableHeadTemplate } from './wb-tracks-edit.html.js'
import { cssTemplate } from './wb-tracks-edit.css.js'
import { renderTemplates } from '../../../commonMethods.js'
import { validateSeconds, validateMinutes, setRedBorders } from '../../../config/validations.js'

customElements.define('wb-tracks-edit',

  class extends HTMLElement {
    #tracksWrapper
    #addTrackBtn
    #removeTrackConfirmDiv
    #removeTrackConfirmMsg
    #removeTrackCancel
    #removeTrackSubmit
    #trackIdOfTrackToDelete = null
    tracksToBeRemoved = []

    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      renderTemplates(cssTemplate, htmlTemplate, this.shadowRoot)
    }

    /**
     * Called when the component is added to DOM.
     */
    connectedCallback () {
      /* ----------------------- REFERENCES ----------------------- */
      this.#tracksWrapper = this.shadowRoot.querySelector('#tracksWrapper')
      this.#addTrackBtn = this.shadowRoot.querySelector('#addTrackBtn')
      this.#removeTrackConfirmDiv = this.shadowRoot.querySelector('#removeTrackConfirmDiv')
      this.#removeTrackConfirmMsg = this.shadowRoot.querySelector('#removeTrackConfirmMsg')
      this.#removeTrackCancel = this.shadowRoot.querySelector('#removeTrackCancel')
      this.#removeTrackSubmit = this.shadowRoot.querySelector('#removeTrackSubmit')

      /* ---------- EVENT LISTENERS ------------------------------------------------------------------------- */
      this.#addTrackBtn.addEventListener('click', () => {
        this.#createAnotherTrack()
      })

      this.#removeTrackCancel.addEventListener('click', (event) => {
        event.preventDefault()
        this.#hideConfirmDeleteMessage()
        this.#trackIdOfTrackToDelete = null
      })

      this.#removeTrackSubmit.addEventListener('click', (event) => {
        event.preventDefault()
        if (this.#trackIdOfTrackToDelete) {
          this.tracksToBeRemoved.push(this.#trackIdOfTrackToDelete)
          this.#tracksWrapper.querySelector(`[data-id="${this.#trackIdOfTrackToDelete}"]`).remove()
          this.#hideConfirmDeleteMessage()
        }
      })

      this.#tracksWrapper.addEventListener('input', (event) => {
        if (event.target.matches('.secondsField')) {
          const isValid = validateSeconds(event.target.value)
          setRedBorders(isValid, event.target)
        }
        if (event.target.matches('.minutesField')) {
          const isValid = validateMinutes(event.target.value)
          setRedBorders(isValid, event.target)
        }
      })

      this.#tracksWrapper.addEventListener('click', (event) => {
        if (event.target.matches('.deleteBtnTD div')) {
          this.#confirmTrackDeletion(event)
        }
      })
    }

    #confirmTrackDeletion(event) {
      const row = event.target.closest('.editTracksContainer')
      const trackTitle = row.querySelector('.trackTitle').value
      this.#removeTrackConfirmMsg.textContent = `Do you want to delete track \"${trackTitle}"?`
      this.#displayConfirmDeleteMessage()
      this.#trackIdOfTrackToDelete = row.dataset.id
    }

    #displayConfirmDeleteMessage(){
      this.#removeTrackConfirmDiv.style.display = 'block'
    }

    #hideConfirmDeleteMessage() {
      this.#removeTrackConfirmDiv.style.display = 'none'
    }

    populateTracks (tracks) {
      const trackTable = this.#createTable()

      Object.values(tracks).forEach((track) => {
        const rowElement = this.#createRowElement()
        this.#addTextContentToRowElements(rowElement, track)
        this.#addAttributesToRowElements(rowElement, track)
        trackTable.append(rowElement)
      })
      this.#tracksWrapper.append(trackTable)
    }

    #createTable () {
      const table = document.createElement('table')
      const tableHead = tableHeadTemplate.content.cloneNode(true)
      table.append(tableHead)
      return table
    }

    #createRowElement () {
      const rowElement = trackRowTemplate.content.cloneNode(true)
      return rowElement
    }

    #addTextContentToRowElements (rowElement, track) {
      rowElement.querySelector('.trackIndexTD').textContent = `${track.trackIndex}.`
      rowElement.querySelector('.trackTitle').value = track.trackTitle
      rowElement.querySelector('.minutesField').value = track.minutes
      rowElement.querySelector('.secondsField').value = String(track.seconds).padStart(2, '0')
    }

    #addAttributesToRowElements (rowElement, track) {
      rowElement.querySelector('.trackIndexTD').dataset.trackIndex = `${track.trackIndex}`
      rowElement.querySelector('.editTracksContainer').dataset.id = track.id
    }

    #createAnotherTrack () {
      const lastTrackIndex = this.#findLastTrackIndex()

      const rowElement = this.#createRowElement()

      rowElement.querySelector('.trackIndexTD').textContent = `${parseInt(lastTrackIndex) + 1}.`
      rowElement.querySelector('.trackIndexTD').dataset.trackIndex = `${parseInt(lastTrackIndex) + 1}`

      this.#tracksWrapper.querySelector('table').append(rowElement)
      this.#setNewlyAddedTrackInFocus()
    }

    #findLastTrackIndex () {
      const lastTrack = this.#tracksWrapper.querySelector('table').lastElementChild
      let lastTrackIndex = 0
      if (lastTrack !== null) {
        lastTrackIndex = lastTrack.querySelector('.trackIndexTD').dataset.trackIndex
      }
      return lastTrackIndex
    }

    #setNewlyAddedTrackInFocus () {
      const allTrackTitleInputs = this.#tracksWrapper.getElementsByClassName('trackTitle')
      const indexOfLstTrackTitleInput = allTrackTitleInputs.length - 1
      const lastTrackTitleInputElement = allTrackTitleInputs[indexOfLstTrackTitleInput]
      lastTrackTitleInputElement.focus()
    }

    prepareTracksForSubmission () {
      const tracksToSubmit = []

      const allEditTracksContainers = this.shadowRoot.querySelectorAll('.editTracksContainer')
      allEditTracksContainers.forEach((trackContainer) => {
        const track = {}
        track.id = trackContainer.dataset.id
        track.trackIndex = trackContainer.querySelector('.trackIndexTD').dataset.trackIndex
        track.trackTitle = trackContainer.querySelector('.trackTitle').value
        track.minutes = trackContainer.querySelector('.minutesField').value
        track.seconds = trackContainer.querySelector('.secondsField').value
        tracksToSubmit.push(track)
      })
      return tracksToSubmit
    }
  }
)
