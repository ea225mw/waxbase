import { cssTemplate } from './wb-records-table.css.js'
import htmlTemplate from './wb-records-table.html.js'

customElements.define('wb-records-table',
  /**
   *
   */
  class extends HTMLElement {
    #allRecordsTable
    #tbody
    #baseURLClient
    /**
     * Creates a new instance of the wb-record-table web component.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      this.renderTemplates()
      this.#tbody = this.shadowRoot.querySelector('tbody')
      this.#allRecordsTable = this.shadowRoot.querySelector('#allRecordsTable')
    }

    /**
     * Renders <style> and <template> elements from template files.
     */
    renderTemplates () {
      const style = document.createElement('style')
      style.textContent = cssTemplate

      const template = document.createElement('template')
      template.innerHTML = htmlTemplate

      this.shadowRoot.append(style, template.content.cloneNode(true))
    }

    /**
     * Called when the component is added to DOM.
     */
    connectedCallback () {
      this.getAllRecordsData()
      this.#allRecordsTable.addEventListener('click', (event) => this.getSingleRecord(event))
    }

    /**
     * Loads the base URL to use for communication with the backend.
     * Is set differently for dev and production.
     */
    async loadBaseURLClient () {
      // eslint-disable-next-line import/no-absolute-path
      const config = await import(new URL('../../config/variables.js', import.meta.url))
      this.#baseURLClient = config.baseURLClient
    }

    /**
     * Called in connectedCallback and fetches all records from the database and displays them in the table.
     */
    async getAllRecordsData () {
      await this.loadBaseURLClient()
      const response = await fetch(`${this.#baseURLClient}records/allalbums`)
      const data = await response.json()
      Object.values(data).forEach((record) => {
        this.setRecordData(record)
      })
    }

    /**
     * Sets the data for every record in the database and adds it to the table.
     *
     * @param {object} record - The record object.
     */
    setRecordData (record) {
      const tr = document.createElement('tr')
      tr.classList.add('recordTableRow')
      tr.dataset.id = record.id

      const [idTD, formatTD, albumTitleTD, fullNameTD, releaseYearTD, priceTD, storeNameTD, mediaConditionTD, sleeveConditionTD] = ['td', 'td', 'td', 'td', 'td', 'td', 'td', 'td', 'td'].map(tag => document.createElement(tag))

      const centeredItems = [idTD, releaseYearTD, mediaConditionTD, sleeveConditionTD]
      centeredItems.forEach((item) => {
        item.classList.add('centered')
      })

      const allTD = { id: idTD, format: formatTD, albumTitle: albumTitleTD, fullName: fullNameTD, releaseYear: releaseYearTD, price: priceTD, store: storeNameTD, mediaCondition: mediaConditionTD, sleeveCondition: sleeveConditionTD }

      this.setClassesOnTD(allTD)
      this.fillTextInTD(allTD, record)

      tr.append(idTD, formatTD, albumTitleTD, fullNameTD, releaseYearTD, priceTD, storeNameTD, mediaConditionTD, sleeveConditionTD)

      this.#tbody.append(tr)
    }

    /**
     * Sets classes to the the td elements created in method setRecordData.
     *
     * @param {object} allTD - An object containing all td elements.
     */
    setClassesOnTD (allTD) {
      allTD.id.classList.add('id')
      allTD.format.classList.add('format')
      allTD.albumTitle.classList.add('albumTitle')
      allTD.fullName.classList.add('fullName')
      allTD.releaseYear.classList.add('releaseYear')
      allTD.price.classList.add('price')
      allTD.store.classList.add('store')
      allTD.mediaCondition.classList.add('mediaCondition')
      allTD.sleeveCondition.classList.add('sleeveCondition')
    }

    /**
     * Fills in the correct text in the td elements.
     *
     * @param {object} allTD - An object containing all td elements.
     * @param {object} record - The record object.
     */
    fillTextInTD (allTD, record) {
      allTD.id.textContent = record.id
      if (record.format) {
        allTD.format.textContent = record.format.format
      }
      allTD.albumTitle.textContent = record.albumTitle
      allTD.fullName.textContent = record.artist.fullName
      allTD.releaseYear.textContent = record.releaseYear
      allTD.price.textContent = record.price
      if (record.store) {
        allTD.store.textContent = record.store.storeName
      }
      if (record.mediaCondition) {
        allTD.mediaCondition.textContent = record.mediaCondition.conditionName
      }
      if (record.sleeveCondition) {
        allTD.sleeveCondition.textContent = record.sleeveCondition.conditionName
      }
    }

    /**
     * Fetches the clicked on record from the database and displays it in the single record view.
     * Also highlights the clicked on record in the record table.
     *
     * @param {MouseEvent} event - The click event.
     */
    async getSingleRecord (event) {
      const row = event.target.closest('tr.recordTableRow')
      if (!row) return

      // Highlight selected row in allRecordsTable.
      this.shadowRoot.querySelectorAll('.recordTableRow').forEach(r => r.classList.remove('selected'))
      row.classList.add('selected')

      // Get detailed information on selected record.
      const id = row.dataset.id
      const response = await fetch(`${this.#baseURLClient}records/viewSingleAlbum`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id
        })
      })
      const record = await response.json()

      this.dispatchEvent(new CustomEvent('showSingleRecord', {
        detail: {
          rec: record
        }
      }))
    }

    /**
     * Updates the record table when information is edited.
     *
     * @param {object} record - The record object.
     */
    updateTableRow (record) {
      const row = this.shadowRoot.querySelector(`tr[data-id="${record.id}"]`)
      const idTD = row.querySelector('.id')
      const formatTD = row.querySelector('.format')
      const albumTitleTD = row.querySelector('.albumTitle')
      const fullNameTD = row.querySelector('.fullName')
      const releaseYearTD = row.querySelector('.releaseYear')
      const priceTD = row.querySelector('.price')
      const storeNameTD = row.querySelector('.store')
      const mediaConditionTD = row.querySelector('.mediaCondition')
      const sleeveConditionTD = row.querySelector('.sleeveCondition')

      const allTD = { id: idTD, format: formatTD, albumTitle: albumTitleTD, fullName: fullNameTD, releaseYear: releaseYearTD, price: priceTD, store: storeNameTD, mediaCondition: mediaConditionTD, sleeveCondition: sleeveConditionTD }

      this.fillTextInTD(allTD, record)
    }

    /**
     * Removes the table row that holds the deleted record.
     *
     * @param {number} id - The id of the record to remove from the table.
     */
    removeDeletedRecord (id) {
      const row = this.shadowRoot.querySelector(`.recordTableRow[data-id="${id}"]`)
      row.remove()
    }
  }
)
