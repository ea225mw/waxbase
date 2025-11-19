import { htmlTemplate } from './wb-store-suggestions.html.js'
/*CSS template shared with wb-artist-suggestions component */
import { sharedCssTemplate } from './wb-store-suggestions.css.js'
import { renderTemplates } from '../../../commonMethods.js'

customElements.define(
  'wb-store-suggestions',
  class extends HTMLElement {
    #allStores
    #storeSuggestionsList
    storeInput
    storeIdHidden

    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
      renderTemplates(sharedCssTemplate, htmlTemplate, this.shadowRoot)
    }

    connectedCallback() {
      this.#storeSuggestionsList = this.shadowRoot.querySelector('#storeSuggestions')
      this.storeInput = this.shadowRoot.querySelector('input[name="store"]')
      this.storeIdHidden = this.shadowRoot.querySelector('#storeIdHidden')

      this.storeInput.addEventListener('input', () => {
        this.#listenForStoreInput()
      })

      this.#storeSuggestionsList.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
          this.#handleClickOnStore
        }
      })
    }

    setAllStores(allStores) {
      this.#allStores = allStores
    }

    /**
     * Populates a suggestions list when typing in the store field.
     */
    #listenForStoreInput() {
      const query = this.storeInput.value.toLowerCase()
      const matches = this.#allStores.filter((store) => `${store.storeName}`.toLowerCase().includes(query))
      this.#storeSuggestionsList.innerHTML = ''
      matches.forEach((store) => {
        const li = document.createElement('li')
        li.textContent = `${store.storeName}`
        li.dataset.id = store.id
        this.#storeSuggestionsList.appendChild(li)
      })
    }

    #handleClickOnStore(event) {
      this.storeInput.value = event.target.textContent
      this.storeIdHidden.value = event.target.dataset.id
      this.#storeSuggestionsList.innerHTML = ''
    }
  }
)
