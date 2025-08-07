import { htmlTemplate } from './wb-tracks-edit.html.js'
import { cssTemplate } from './wb-tracks-edit.css.js'
import { renderTemplates } from '../../../commonMethods.js'
import { validateSeconds, validateMinutes } from '../../../config/validations.js'

const pathToModule = import.meta.url
const deleteBtnImgPath = new URL('./images/deletebtn.png', pathToModule)

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
    #tracksToBeRemoved = []

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
          this.#tracksToBeRemoved.push(this.#tracksWrapper.lastElementChild.dataset.id)
        }
        this.#tracksWrapper.lastElementChild.remove()
        this.#removeTrackConfirmDiv.style.display = 'none'
      })

      this.#tracksWrapper.addEventListener('input', (event) => {
        if (event.target.matches('.secondsField')) {
          const valid = validateSeconds(event.target.value)
          this.setRedBorders(valid, event.target)
        }
        if (event.target.matches('.minutesField')) {
          const valid = validateMinutes(event.target.value)
          this.setRedBorders(valid, event.target)
        }
      })
    }

    /**
     * Getter for #tracksToBeRemoved.
     *
     * @returns {Array} - The array with tracks to be removed.
     */
    get tracksToBeRemoved () {
      return this.#tracksToBeRemoved
    }

    /**
     * Populates the tracks tab with all tracks from the record object.
     *
     * @param {Array} tracks - The trackslist array from the record object.
     */
    populateTracks (tracks) {
      const table = document.createElement('table')
      const tableHead = tableHeadTemplate.content.cloneNode(true)
      table.append(tableHead)

      Object.values(tracks).forEach((track) => {
        const [tr, td1TrackIndex, td2Title, trackTitleField, td3Minutes, trackMinutesField, td4Seconds, trackSecondsField, td5DeleteBtn] = this.createRowTemplate()

        tr.dataset.id = track.id

        td1TrackIndex.textContent = `${track.trackIndex}.`
        td1TrackIndex.dataset.trackIndex = `${track.trackIndex}`

        trackTitleField.value = track.trackTitle
        td2Title.append(trackTitleField)

        trackMinutesField.value = track.minutes
        trackMinutesField.dataset.valid = 'true'
        td3Minutes.append(trackMinutesField)

        trackSecondsField.value = String(track.seconds).padStart(2, '0')
        trackSecondsField.dataset.valid = 'true'
        td4Seconds.append(trackSecondsField)

        const deleteBtnImg = document.createElement('img')
        deleteBtnImg.src = deleteBtnImgPath
        td5DeleteBtn.append(deleteBtnImg)

        const elementsForClassAssignment = [tr, td1TrackIndex, trackTitleField, trackMinutesField, trackSecondsField, td5DeleteBtn]
        this.assignClasses(elementsForClassAssignment)

        tr.append(td1TrackIndex, td2Title, td3Minutes, td4Seconds, td5DeleteBtn)
        table.append(tr)
      })
      this.#tracksWrapper.append(table)
    }

    /**
     * Creates HTML elements according to the array.
     *
     * @returns {Array} - Ann array of HTML elements.
     */
    createRowTemplate () {
      const template = ['tr', 'td', 'td', 'input', 'td', 'input', 'td', 'input', 'td'].map(tag => document.createElement(tag))

      return template
    }

    /**
     * Adds classes to elements in an array that needs class assignments.
     *
     * @param {Array} array - The HTML elements array.
     */
    assignClasses (array) {
      array[0].classList.add('editTracksContainer')
      array[1].classList.add('trackIndexTD')
      array[2].classList.add('trackTitle')
      array[3].classList.add('minutesField')
      array[4].classList.add('secondsField')
      array[5].classList.add('deleteBtnTD')
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
      const [tr, td1TrackIndex, td2Title, trackTitleField, td3Minutes, trackMinutesField, td4Seconds, trackSecondsField, td5DeleteBtn] = this.createRowTemplate()

      td1TrackIndex.textContent = `${parseInt(lastIndex) + 1}.`
      td1TrackIndex.dataset.trackIndex = `${parseInt(lastIndex) + 1}`
      tr.append(td1TrackIndex)

      td2Title.append(trackTitleField)
      td3Minutes.append(trackMinutesField)
      td4Seconds.append(trackSecondsField)

      trackMinutesField.dataset.valid = 'true'
      trackSecondsField.dataset.valid = 'true'

      const deleteBtnImg = document.createElement('img')
      deleteBtnImg.src = deleteBtnImgPath
      td5DeleteBtn.append(deleteBtnImg)

      const elementsForClassAssignment = [tr, td1TrackIndex, trackTitleField, trackMinutesField, trackSecondsField, td5DeleteBtn]
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
      const tracks = []

      const allEditTracksContainers = this.shadowRoot.querySelectorAll('.editTracksContainer')
      allEditTracksContainers.forEach((trackContainer) => {
        const track = {}
        track.id = trackContainer.dataset.id
        track.trackIndex = trackContainer.querySelector('.trackIndexTD').dataset.trackIndex
        track.trackTitle = trackContainer.querySelector('.trackTitle').value
        track.minutes = trackContainer.querySelector('.minutesField').value
        track.seconds = trackContainer.querySelector('.secondsField').value
        tracks.push(track)
      })
      return tracks
    }
  }
)
