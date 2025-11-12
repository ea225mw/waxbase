import { cssTemplate } from './wb-records-table.css.js'
import { htmlTemplate } from './wb-records-table.html.js'
import { baseURLClient } from '../../config/variables.js'
import { renderTemplates } from '../../commonMethods.js'

customElements.define(
  'wb-records-table',
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
    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
      renderTemplates(cssTemplate, htmlTemplate, this.shadowRoot)
      this.#tbody = this.shadowRoot.querySelector('tbody')
      this.#allRecordsTable = this.shadowRoot.querySelector('#allRecordsTable')
    }

    /**
     * Called when the component is added to DOM.
     */
    async connectedCallback() {
      this.#baseURLClient = baseURLClient
      await this.getAllRecordsData()

      this.#allRecordsTable.addEventListener('click', (event) => {
        const row = event.target.closest('tr.recordTableRow')
        if (!row) return
        this.highlightRow(row)

        const id = row.dataset.id
        this.dispatchEvent(
          new CustomEvent('showSingleRecord', {
            detail: {
              recordId: id
            }
          })
        )
      })
    }

    /**
     * Called in connectedCallback and fetches all records from the database and displays them in the table.
     */
    async getAllRecordsData() {
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
    setRecordData(record) {
      const tr = document.createElement('tr')
      tr.classList.add('recordTableRow')
      tr.dataset.id = record.id

      const [
        idTD,
        formatTD,
        albumTitleTD,
        fullNameTD,
        releaseYearTD,
        priceTD,
        storeNameTD,
        mediaConditionTD,
        sleeveConditionTD
      ] = ['td', 'td', 'td', 'td', 'td', 'td', 'td', 'td', 'td'].map((tag) => document.createElement(tag))

      const centeredItems = [idTD, releaseYearTD, mediaConditionTD, sleeveConditionTD]
      centeredItems.forEach((item) => {
        item.classList.add('centered')
      })

      const allTD = {
        id: idTD,
        format: formatTD,
        albumTitle: albumTitleTD,
        fullName: fullNameTD,
        releaseYear: releaseYearTD,
        price: priceTD,
        store: storeNameTD,
        mediaCondition: mediaConditionTD,
        sleeveCondition: sleeveConditionTD
      }

      this.setClassesOnTD(allTD)
      this.fillTextInTD(allTD, record)

      tr.append(
        idTD,
        formatTD,
        albumTitleTD,
        fullNameTD,
        releaseYearTD,
        priceTD,
        storeNameTD,
        mediaConditionTD,
        sleeveConditionTD
      )

      this.#tbody.append(tr)
    }

    /**
     * Sets classes to the the td elements created in method setRecordData.
     *
     * @param {object} allTD - An object containing all td elements.
     */
    setClassesOnTD(allTD) {
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
    fillTextInTD(allTD, record) {
      allTD.id.textContent = record.id
      if (record.format) {
        allTD.format.textContent = record.format.format
      }
      allTD.albumTitle.textContent = record.albumTitle
      allTD.fullName.textContent = record.artist.sortName || record.artist.displayName
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
     * Highlights a row in the record table.
     *
     * @param {HTMLTableRowElement} row - The table row to highlight.
     */
    highlightRow(row) {
      this.shadowRoot.querySelectorAll('.recordTableRow').forEach((r) => r.classList.remove('selected'))
      row.classList.add('selected')
    }

    /**
     * Marks one row in the record table.
     *
     * @param {number} id - The id of the record that should be marked and highlighted.
     */
    selectRowToHighlight(id) {
      const rowToHighlight = this.shadowRoot.querySelector(`tr[data-id="${id}"]`)
      this.highlightRow(rowToHighlight)
    }

    /**
     * Updates the record table when information is edited.
     *
     * @param {object} record - The record object.
     */
    updateTableRow(record) {
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

      const allTD = {
        id: idTD,
        format: formatTD,
        albumTitle: albumTitleTD,
        fullName: fullNameTD,
        releaseYear: releaseYearTD,
        price: priceTD,
        store: storeNameTD,
        mediaCondition: mediaConditionTD,
        sleeveCondition: sleeveConditionTD
      }

      this.fillTextInTD(allTD, record)
    }

    /**
     * Removes the table row that holds the deleted record.
     *
     * @param {number} id - The id of the record to remove from the table.
     */
    removeDeletedRecord(id) {
      const row = this.shadowRoot.querySelector(`.recordTableRow[data-id="${id}"]`)
      row.remove()
    }
  }
)
