import { cssTemplate } from './wb-search.css.js'
import { htmlTemplate } from './wb-search.html.js'
import { baseURLClient } from '../../config/variables.js'
import { renderTemplates } from '../../commonMethods.js'

customElements.define('wb-search',
  /**
   *
   */
  class extends HTMLElement {
    #baseURLClient
    #searchBtn
    #artistInput
    #titleInput
    #formatInput
    #catNrInput

    /**
     * Creates a new instance of the wb-search web component.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      renderTemplates(cssTemplate, htmlTemplate, this.shadowRoot)
    }

    /**
     * Called when the web component is added to DOM.
     */
    connectedCallback () {
      // ------------- REFERENCS --------------------
      this.#baseURLClient = baseURLClient
      this.#searchBtn = this.shadowRoot.querySelector('#searchSubmit')
      this.#artistInput = this.shadowRoot.querySelector('input[name="artist"]')
      this.#titleInput = this.shadowRoot.querySelector('input[name="title"]')
      this.#formatInput = this.shadowRoot.querySelector('input[name="format"]')
      this.#catNrInput = this.shadowRoot.querySelector('input[name="catno"]')

      // ------------- EVENT LISTENERS --------------
      this.#searchBtn.addEventListener('click', () => {
        this.searchRecord()
      })
    }

    /**
     * Sends the search query to backend.
     */
    async searchRecord () {
      const data = {
        artist: this.#artistInput.value,
        title: this.#titleInput.value,
        format: this.#formatInput.value,
        catno: this.#catNrInput.value
      }
      const response = await fetch(`${this.#baseURLClient}search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const discogsData = await response.json()
      // console.log(discogsData)

      if (discogsData.typeOfResponse === 'OneSingleRecord') {
        this.prepareOneSingleRecord(discogsData.data)
      }

      if (discogsData.typeOfResponse === 'MultipleRecords') {
        this.prepareMultipleRecords(discogsData.data)
      }
    }

    /**
     *
     * @param data
     */
    prepareOneSingleRecord (data) {
      console.log(data)
    }

    /**
     *
     * @param data
     */
    prepareMultipleRecords (data) {
      console.log(data.results)
      /*
      if (typeof discogsData !== 'string') {
        Object.entries(discogsData).forEach(element => {
          element.artists.forEach((artist) => {
            console.log(artist.name)
          })
          console.log(element.title)
          element.tracklist.forEach((track) => {
            let duration = ''
            if (track.duration) {
              duration = `- ${track.duration}`
            }
            console.log(`${track.title} ${duration}`)
          })
          console.log(element.year)
        })
      } */
    }
  }
)
