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
    #cancelSearchBtn
    #artistInput
    #titleInput
    #formatInput
    #catNrInput
    #searchResultTable

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
      this.#cancelSearchBtn = this.shadowRoot.querySelector('#cancelSearch')
      this.#artistInput = this.shadowRoot.querySelector('input[name="artist"]')
      this.#titleInput = this.shadowRoot.querySelector('input[name="title"]')
      this.#formatInput = this.shadowRoot.querySelector('input[name="format"]')
      this.#catNrInput = this.shadowRoot.querySelector('input[name="catno"]')
      this.#searchResultTable = this.shadowRoot.querySelector('#searchResultTable')

      // ------------- EVENT LISTENERS --------------
      this.#searchBtn.addEventListener('click', (event) => {
        event.preventDefault()
        this.searchRecord()
      })
      this.#cancelSearchBtn.addEventListener('click', (event) => {
        event.preventDefault()
        this.remove()
      })
      this.#searchResultTable.addEventListener('click', (event) => {
        const button = event.target.closest('button')
        if (button) {
          this.dispatchEvent(new CustomEvent('getOneResourceFromDiscogs', {
            detail: {
              resource_url: button.dataset.resource_url
            }
          }))
          return
        }

        const row = event.target.closest('tr.searchResultTableRow')
        if (row) {
          this.highlightRow(row)
        }
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

      if (discogsData.typeOfResponse === 'NoResults') {
        console.log(discogsData.message)
      }

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

      this.#searchResultTable.querySelector('tbody').innerHTML = ''

      data.results.forEach((record) => {
        const tr = document.createElement('tr')
        tr.classList.add('searchResultTableRow')

        const [catnoTD, titleTD, yearTD, countryTD, formatTD, addTD] = ['td', 'td', 'td', 'td', 'td', 'td'].map(tag => document.createElement(tag))
        catnoTD.textContent = record.catno
        titleTD.textContent = record.title
        yearTD.textContent = record.year
        countryTD.textContent = record.country

        // catnoTD.classList.add('catno')

        record.format.forEach((formatTag) => {
          formatTD.textContent += formatTag + ', '
        })
        formatTD.textContent = formatTD.textContent.slice(0, -2)
        formatTD.classList.add('formatTD')

        addTD.classList.add('addToCollectionTD')
        const addBtn = document.createElement('button')
        addBtn.textContent = 'Add to collection'
        addBtn.dataset.resource_url = record.resource_url
        addTD.append(addBtn)

        tr.append(catnoTD, titleTD, yearTD, countryTD, formatTD, addTD)
        this.#searchResultTable.querySelector('tbody').append(tr)
      })
    }

    /**
     * Highlights a row in the record table.
     *
     * @param {HTMLTableRowElement} row - The table row to highlight.
     */
    highlightRow (row) {
      this.shadowRoot.querySelectorAll('.searchResultTableRow').forEach(r => r.classList.remove('selected'))
      row.classList.add('selected')
      this.handleAddToCollection(row)
    }

    /**
     *
     * @param row
     */
    handleAddToCollection (row) {
      this.shadowRoot.querySelectorAll('.addToCollectionTD').forEach(td => { td.style.display = 'none' })
      row.querySelector('.addToCollectionTD').style.display = 'flex'
    }
  }
)
