import { htmlTemplate, trackRowTemplate } from './wb-tracks-edit.html.js'
import { cssTemplate } from './wb-tracks-edit.css.js'
import { renderTemplates } from '../../../commonMethods.js'
import { validateSeconds, validateMinutes, setRedBorders } from '../../../config/validations.js'

const tableHeadTemplate = document.createElement('template')
tableHeadTemplate.innerHTML = `
<thead>
  <tr>
    <th></th>
    <th>Title</th>
    <th>Min</th>
    <th>Sec</th>
  </tr>
</thead>
`

customElements.define('wb-tracks-edit',
  /**
   *
   */
  class extends HTMLElement {
    #tracksWrapper
    #addTrackBtn
    #removeTrackConfirmDiv
    #removeTrackConfirmMsg
    #removeTrackCancel
    #removeTrackSubmit
    tracksToBeRemoved = []

    /**
     * Creates a new instance of wb-track-edit web component.
     */
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
        this.createAnotherTrack()
      })

      this.#removeTrackCancel.addEventListener('click', (event) => {
        event.preventDefault()
        this.#removeTrackConfirmDiv.style.display = 'none'
      })
      this.#removeTrackSubmit.addEventListener('click', (event) => {
        event.preventDefault()
        if (this.#tracksWrapper.lastElementChild.dataset.id) {
          this.tracksToBeRemoved.push(this.#tracksWrapper.lastElementChild.dataset.id)
        }
        this.#tracksWrapper.lastElementChild.remove()
        this.#removeTrackConfirmDiv.style.display = 'none'
      })

      this.#tracksWrapper.addEventListener('input', (event) => {
        if (event.target.matches('.secondsField')) {
          const valid = validateSeconds(event.target.value)
          setRedBorders(valid, event.target)
        }
        if (event.target.matches('.minutesField')) {
          const valid = validateMinutes(event.target.value)
          setRedBorders(valid, event.target)
        }
      })

      this.#tracksWrapper.addEventListener('click', (event) => {
        if (event.target.matches('.deleteBtnTD div')) {
          const row = event.target.closest('.editTracksContainer')
          row.remove()
        }
      })
    }

    /**
     *
     * @param tracks
     */
    populateTracks (tracks) {
      const trackTable = this.createTable()

      Object.values(tracks).forEach((track) => {
        const rowElement = this.createRowElement()
        this.addTextContentToRowElements(rowElement, track)
        this.addAttributesToRowElements(rowElement, track)
        trackTable.append(rowElement)
      })
      this.#tracksWrapper.append(trackTable)
    }

    /**
     *
     */
    createTable () {
      const table = document.createElement('table')
      const tableHead = tableHeadTemplate.content.cloneNode(true)
      table.append(tableHead)
      return table
    }

    /**
     *
     */
    createRowElement () {
      const template = document.createElement('template')
      template.innerHTML = trackRowTemplate
      const rowElement = template.content.cloneNode(true)
      return rowElement
    }

    /**
     *
     * @param rowElement
     * @param track
     */
    addTextContentToRowElements (rowElement, track) {
      rowElement.querySelector('.trackIndexTD').textContent = `${track.trackIndex}.`
      rowElement.querySelector('.trackTitle').value = track.trackTitle
      rowElement.querySelector('.minutesField').value = track.minutes
      rowElement.querySelector('.secondsField').value = String(track.seconds).padStart(2, '0')
    }

    /**
     *
     * @param rowElement
     * @param track
     */
    addAttributesToRowElements (rowElement, track) {
      rowElement.querySelector('.trackIndexTD').dataset.trackIndex = `${track.trackIndex}`
      rowElement.querySelector('.editTracksContainer').dataset.id = track.id
    }

    /**
     * Adds another track to the tracklist with empty fields for the user to fill.
     */
    createAnotherTrack () {
      const lastTrack = this.#tracksWrapper.querySelector('table').lastElementChild
      let lastIndex = 0
      if (lastTrack !== null) {
        lastIndex = lastTrack.querySelector('.trackIndexTD').dataset.trackIndex
      }
      const [tr, td1TrackIndex, td2Title, trackTitleInput, td3Minutes, trackMinutesInput, td4Seconds, trackSecondsInput, td5DeleteBtn] = this.createHtmlElementsForRow()

      td1TrackIndex.textContent = `${parseInt(lastIndex) + 1}.`
      td1TrackIndex.dataset.trackIndex = `${parseInt(lastIndex) + 1}`
      tr.append(td1TrackIndex)

      td2Title.append(trackTitleInput)
      td3Minutes.append(trackMinutesInput)
      td4Seconds.append(trackSecondsInput)

      trackMinutesInput.dataset.valid = 'true'
      trackSecondsInput.dataset.valid = 'true'

      this.createDeleteButton(td5DeleteBtn)

      const elementsForClassAssignment = [tr, td1TrackIndex, trackTitleInput, trackMinutesInput, trackSecondsInput, td5DeleteBtn]
      this.assignClasses(elementsForClassAssignment)

      tr.append(td1TrackIndex, td2Title, td3Minutes, td4Seconds, td5DeleteBtn)
      this.#tracksWrapper.querySelector('table').append(tr)
      tr.querySelector('.trackTitle').focus()
    }

    /**
     * Prepares all tracks into an array before submission to the server.
     *
     * @returns {Array} - The tracks array.
     */
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
