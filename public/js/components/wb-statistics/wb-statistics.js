import { cssTemplate } from './wb-statistics.css.js'
import { htmlTemplate } from './wb-statistics.html.js'
import { renderTemplates } from '../../commonMethods.js'

customElements.define('wb-statistics',
  /**
   * Encapsulates a statistics web component.
   */
  class extends HTMLElement {
    #baseURLClient
    #toggableDiv
    #toggleStatisticsBtn
    /**
     * Creates a new instance of the wb-statistics web component.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      renderTemplates(cssTemplate, htmlTemplate, this.shadowRoot)
      this.#toggableDiv = this.shadowRoot.querySelector('.toggableDiv')
      this.#toggleStatisticsBtn = this.shadowRoot.querySelector('#toggleStatisticsBtn')
    }

    /**
     * Called when the component is added to DOM.
     */
    connectedCallback () {
      this.loadBaseURLClient()
      this.#toggleStatisticsBtn.addEventListener('click', () => {
        this.#toggableDiv.classList.toggle('visible')
        if (this.#toggableDiv.classList.contains('visible')) {
          this.#toggleStatisticsBtn.querySelector('div').textContent = 'Hide statistics'
        } else {
          this.#toggleStatisticsBtn.querySelector('div').textContent = 'Show statistics'
        }
      })
    }

    /**
     * Loads a base URL for easier change between dev and production.
     */
    async loadBaseURLClient () {
      // eslint-disable-next-line import/no-absolute-path
      const config = await import(new URL('../../config/variables.js', import.meta.url))
      this.#baseURLClient = config.baseURLClient
      this.updateStatistics()
    }

    /**
     * Fetches collection status data from the database and updates the corresponding fields in the web component.
     */
    async updateStatistics () {
      const respone = await fetch(`${this.#baseURLClient}records/statistics`)
      const statistics = await respone.json()
      this.shadowRoot.querySelector('#moneySpent').textContent = `${statistics.totalPrice} SEK`
      this.shadowRoot.querySelector('#albumCount').textContent = `${statistics.albumCount}`
    }
  }
)
