import { cssTemplate } from './wb-statistics.css.js'
import { htmlTemplate } from './wb-statistics.html.js'
import { renderTemplates } from '../../commonMethods.js'

customElements.define(
  'wb-statistics',
  /**
   * Encapsulates a statistics web component.
   */
  class extends HTMLElement {
    #toggableDiv
    #toggleStatisticsBtn

    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
      renderTemplates(cssTemplate, htmlTemplate, this.shadowRoot)
      this.#toggableDiv = this.shadowRoot.querySelector('.toggableDiv')
      this.#toggleStatisticsBtn = this.shadowRoot.querySelector('#toggleStatisticsBtn')
    }

    /**
     * Called when the component is added to DOM.
     */
    connectedCallback() {
      this.#toggleStatisticsBtn.addEventListener('click', () => {
        this.#handleStatisticsVisibility()
      })
    }

    #handleStatisticsVisibility() {
      this.#toggableDiv.classList.toggle('visible')
      if (this.#toggableDiv.classList.contains('visible')) {
        this.#toggleStatisticsBtn.querySelector('div').textContent = 'Hide statistics'
      } else {
        this.#toggleStatisticsBtn.querySelector('div').textContent = 'Show statistics'
      }
    }

    updateStatistics(statistics) {
      this.shadowRoot.querySelector('#moneySpent').textContent = `${statistics.totalPrice} SEK`
      this.shadowRoot.querySelector('#albumCount').textContent = `${statistics.albumCount}`
    }
  }
)
