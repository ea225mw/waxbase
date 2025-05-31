import { cssTemplate } from './wb-search.css.js'
import { htmlTemplate } from './wb-search.html.js'
import { baseURLClient } from '../../config/variables.js'

customElements.define('wb-search',
  /**
   *
   */
  class extends HTMLElement {
    #baseURLClient

    /**
     *
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      renderTemplates(cssTemplate, htmlTemplate, this.shadowRoot)
    }

    /**
     *
     */
    connectedCallback () {
      this.#baseURLClient = baseURLClient
    }

    /**
     *
     */
    async searchRecord () {
      const data = {
        artist: this.shadowRoot.querySelector('input[name="artist"]').value,
        title: this.shadowRoot.querySelector('input[name="title"]').value,
        format: this.shadowRoot.querySelector('input[name="format"]').value
      }
      const response = await fetch(`${this.#baseURLClient}records/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const result = await response.json()
      console.log(result)
    }
  }
)
