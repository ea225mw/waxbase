import { EditRecordBaseClass } from './editRecordBaseClass.js'
import { cssTemplate } from './wb-edit-record.css.js'
import { htmlTemplate } from './wb-edit-record.html.js'
import { renderTemplates } from '../../commonMethods.js'

customElements.define('wb-new-record',
  /**
   * Defines a form tool to add a new record to the database.
   */
  class extends EditRecordBaseClass {
    #cancel
    #submit
    #tabsDiv
    #allConditions = []
    /**
     * Creates a new instance of the wb-new-record web component.
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
      super.connectedCallback()
      // SETTING UP REFERENCES
      this.#cancel = this.shadowRoot.querySelector('#cancel')
      this.#submit = this.shadowRoot.querySelector('#submit')
      this.#tabsDiv = this.shadowRoot.querySelector('#tabsDiv')

      /* ---------- EVENT LISTENERS ---------- */
      this.#cancel.addEventListener('click', () => this.cancel())
      this.#submit.addEventListener('click', (event) => this.submit(event))
      this.#tabsDiv.addEventListener('click', (event) => this.changeFormView(event))
    }

    /**
     * Initial set up of the form for the record being added.
     */
    async newEmptyRecord () {
      this.createFormatOptions()
      this.createConditionOptions()

      this.style.display = 'block'
      document.body.style.pointerEvents = 'none'
      this.style.pointerEvents = 'auto'
    }

    /**
     *
     *
     * @param {JSON} discogsRecord - The JSON response from Discogs API.
     */
    newDiscogsRecord (discogsRecord) {
      this.createFormatOptions()
      this.createConditionOptions()
      console.log(discogsRecord)

      this.artistInput.value = discogsRecord.artists[0].name || discogsRecord.artists_sort

      this.albumTitle.value = discogsRecord.title || ''
      this.formatId.value = String(this.getFormat(discogsRecord))
      this.releaseYear.value = discogsRecord.year || ''

      const transformedTracklist = this.transformDiscogsTracklist(discogsRecord.tracklist)
      this.populateTracks(transformedTracklist)

      this.style.display = 'block'
    }

    /**
     * Prepares the Discogs release tracklist to work with method populateTracks().
     *
     * @param {Array} tracklist - The tracklist from the Discogs release.
     * @returns {Array} - The transformed tracklist
     */
    transformDiscogsTracklist (tracklist) {
      const transformedTracklist = []
      let min = ''
      let sec = ''

      tracklist.forEach(element => {
        if (element.duration !== '') {
          const durationSplit = element.duration.split(':')
          min = durationSplit[0]
          sec = durationSplit[1]
        }

        const track = {
          trackIndex: element.position,
          trackTitle: element.title,
          minutes: min,
          seconds: sec
        }
        transformedTracklist.push(track)
      })
      return transformedTracklist
    }

    /**
     *
     * @param record
     */
    getFormat (record) {
      let formatID = null
      if (record.formats) {
        if (record.formats[0].descriptions.find((element) => element === 'CD') || record.formats[0].name === 'CD') {
          formatID = 1
          console.log('Hello from CD')
        } else if (record.formats[0].descriptions.find((element) => element === 'LP') || record.formats[0].name === 'LP') {
          console.log('Hello from LP')
          formatID = 2
        }
      }
      return formatID
    }

    /**
     * Submits the form to web server.
     *
     * @param {Event} event - The event dispatched from the clicking the OK button.
     */
    async submit (event) {
      // Send form to web server
      event.preventDefault()

      const formData = new FormData(this.albumEditForm)
      const tracks = this.prepareTracksForSubmission()
      formData.append('tracks', JSON.stringify(tracks))

      const response = await fetch(`${this.baseURLClient}records/saveNewRecord`, {
        method: 'POST',
        body: formData
      })
      const record = await response.json()
      console.log('Record in submit of new record:', record)
      this.dispatchEvent(new CustomEvent('recordAdded', {
        detail: {
          addedRecord: record
        }
      }))
      this.cancel()
    }
  })
