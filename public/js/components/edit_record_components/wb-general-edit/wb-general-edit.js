import { htmlTemplate } from './wb-general-edit.html.js'
import { cssTemplate } from './wb-general-edit.css.js'
import { renderTemplates } from '../../../commonMethods.js'
import '../wb-artist-suggestions/wb-artist-suggestions.js'
import '../wb-store-suggestions/wb-store-suggestions.js'

customElements.define(
  'wb-general-edit',
  class extends HTMLElement {
    #albumTitle
    #price
    #releaseYear
    #origReleaseYear

    #wbArtistSuggestions
    artistInput
    artistIdHidden

    #wbStoreSuggestions
    storeInput
    storeIdHidden

    allStores
    allArtists
    allFormats

    #formatId

    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
      renderTemplates(cssTemplate, htmlTemplate, this.shadowRoot)

      this.#createChildComponents()
      this.#appendChildComponents()
      this.#configureChildComponents()
    }

    connectedCallback() {
      this.#albumTitle = this.shadowRoot.querySelector('input[name="albumTitle"]')
      this.#releaseYear = this.shadowRoot.querySelector('input[name="releaseYear"]')
      this.#origReleaseYear = this.shadowRoot.querySelector('input[name="origReleaseYear"]')
      this.#price = this.shadowRoot.querySelector('input[name="price"]')
      this.artistInput = this.#wbArtistSuggestions.artistInput
      this.artistIdHidden = this.#wbArtistSuggestions.artistIdHidden
      this.storeInput = this.#wbStoreSuggestions.storeInput
      this.storeIdHidden = this.#wbStoreSuggestions.storeIdHidden
      this.#formatId = this.shadowRoot.querySelector('select[name="formatId"]')
    }

    #createChildComponents() {
      this.#wbArtistSuggestions = document.createElement('wb-artist-suggestions')
      this.#wbStoreSuggestions = document.createElement('wb-store-suggestions')
    }

    #appendChildComponents() {
      this.shadowRoot.querySelector('#artistComponentWrapper').append(this.#wbArtistSuggestions)
      this.shadowRoot.querySelector('#storeComponentWrapper').append(this.#wbStoreSuggestions)
    }

    #createFormatOptions() {
      this.allFormats.forEach((format) => {
        const option = document.createElement('option')
        option.value = format.id
        option.textContent = format.format
        this.#formatId.append(option)
      })
    }

    populateComponentWithRecordData(record) {
      this.#populateArtist(record)
      this.#populateStore(record)
      this.#createFormatOptions()
      this.#populateBasicFields(record)
    }

    #configureChildComponents() {
      this.#wbArtistSuggestions.setAllArtists(this.allArtists)
      this.#wbStoreSuggestions.setAllStores(this.allStores)
    }

    #populateArtist(record) {
      if (record.artist) {
        this.#wbArtistSuggestions.artistInput.value = record.artist.displayName
        this.#wbArtistSuggestions.artistIdHidden.value = record.artistId
      }
    }

    #populateStore(record) {
      if (record.store) {
        this.#wbStoreSuggestions.storeInput.value = record.store.storeName
        this.#wbStoreSuggestions.storeIdHidden.value = record.storeId
      }
    }

    #populateBasicFields(record) {
      console.log(record.formatId)
      this.#albumTitle.value = record.albumTitle
      this.#releaseYear.value = record.releaseYear
      this.#origReleaseYear.value = record.origReleaseYear
      this.#price.value = record.price
      this.#formatId.value = String(record.formatId)
    }
  }
)
