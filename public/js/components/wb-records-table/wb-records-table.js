import { cssTemplate } from './wb-records-table.css.js'
import { htmlTemplate, tableRowTemplate } from './wb-records-table.html.js'
import { renderTemplates } from '../../commonMethods.js'

customElements.define(
  'wb-records-table',

  class extends HTMLElement {
    #allRecordsTable
    #tbody

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
      this.#allRecordsTable.addEventListener('click', (event) => {
        const row = event.target.closest('tr.recordTableRow')
        if (!row) return
        this.#highlightSelectedRow(row)

        const id = row.dataset.id
        this.dispatchEvent(
          new CustomEvent('showSelectedRecord', {
            detail: {
              recordId: id
            }
          })
        )
      })
    }

    populateRecordsTable(allRecords) {
      Object.values(allRecords).forEach((record) => {
        this.setRecordDataToRowAndItsChildren(record)
      })
    }

    setRecordDataToRowAndItsChildren(record) {
      const tr = this.#createTRElementFromTemplate()
      tr.dataset.id = record.id

      this.#fillTextInTD(tr, record)

      this.#tbody.append(tr)
    }

    #createTRElementFromTemplate() {
      const docFragment = tableRowTemplate.content.cloneNode(true)
      const tr = docFragment.querySelector('tr')
      return tr
    }

    /**
     * Fills in the correct text in the td elements.
     *
     * @param {HTMLTableRowElement} tr - The tr element with the td elements.
     * @param {object} record - The record object.
     */
    #fillTextInTD(tr, record) {
      tr.querySelector('.id').textContent = record.id
      if (record.format) {
        tr.querySelector('.format').textContent = record.format.format
      }
      tr.querySelector('.albumTitle').textContent = record.albumTitle
      tr.querySelector('.fullName').textContent = record.artist.sortName || record.artist.displayName
      tr.querySelector('.releaseYear').textContent = record.releaseYear
      tr.querySelector('.price').textContent = record.price
      if (record.store) {
        tr.querySelector('.store').textContent = record.store.storeName
      }
      if (record.mediaCondition) {
        tr.querySelector('.mediaCondition').textContent = record.mediaCondition.conditionName
      }
      if (record.sleeveCondition) {
        tr.querySelector('.sleeveCondition').textContent = record.sleeveCondition.conditionName
      }
    }

    /**
     * Marks one row in the record table.
     *
     * @param {number} id - The id of the record that should be marked and highlighted.
     */
    selectRowToHighlight(id) {
      const rowToHighlight = this.shadowRoot.querySelector(`tr[data-id="${id}"]`)
      this.#highlightSelectedRow(rowToHighlight)
    }

    #highlightSelectedRow(row) {
      this.shadowRoot.querySelectorAll('.recordTableRow').forEach((r) => r.classList.remove('selected'))
      row.classList.add('selected')
    }

    /**
     * Updates the record table when information is edited.
     *
     * @param {object} record - The record object.
     */
    updateTableRow(record) {
      const row = this.shadowRoot.querySelector(`tr[data-id="${record.id}"]`)
      this.#fillTextInTD(row, record)
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
