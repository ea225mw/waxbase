import { htmlTemplate } from './wb-artist-suggestions.html.js'
import { cssTemplate } from './wb-artist-suggestions.css.js'
import { renderTemplates } from '../../../commonMethods.js'

customElements.define(
  'wb-artist-suggestions',
  class extends HTMLElement {
    artistInput
    #artistSuggestionsList
    artistIdHidden
    #allArtists

    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
      renderTemplates(cssTemplate, htmlTemplate, this.shadowRoot)
    }

    connectedCallback() {
      /* ---------- REFERENCES ---------- */
      this.artistInput = this.shadowRoot.querySelector('input[name="artistDisplayName"]')
      this.#artistSuggestionsList = this.shadowRoot.querySelector('#artistSuggestions')
      this.artistIdHidden = this.shadowRoot.querySelector('#artistIdHidden')

      /* ---------- EVENT LISTENERS ---------- */
      this.artistInput.addEventListener('input', () => {
        this.#listenForArtistInput()
      })

      this.#artistSuggestionsList.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
          this.#handleClickOnArtist(event)
        }
      })
    }

    setAllArtists(allArtists) {
      this.#allArtists = allArtists
    }

    #handleClickOnArtist(event) {
      this.artistInput.value = event.target.textContent
      this.artistIdHidden.value = event.target.dataset.id
      this.#artistSuggestionsList.innerHTML = ''
    }

    #listenForArtistInput() {
      const query = this.artistInput.value.toLowerCase()
      const matches = this.#allArtists.filter((artist) => `${artist.displayName}`.toLowerCase().includes(query))

      this.#artistSuggestionsList.innerHTML = ''
      matches.forEach((artist) => {
        const li = document.createElement('li')
        li.textContent = artist.displayName
        li.dataset.id = artist.id
        this.#artistSuggestionsList.appendChild(li)
      })
    }
  }
)
