import { htmlTemplate } from './wb-details-edit.html.js'
import { cssTemplate } from './wb-details-edit.css.js'
import { renderTemplates } from '../../../commonMethods.js'

customElements.define(
  'wb-details-edit',
  class extends HTMLElement {
    #conditionOptions = []

    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
      renderTemplates(cssTemplate, htmlTemplate, this.shadowRoot)
    }

    setConditionOptions(conditions) {
      this.#conditionOptions = conditions
    }

    /**
     * Called from parent component.
     *
     * @param {object} record
     */
    configureComponent(record) {
      this.#createConditionOptions()
      this.#setRPMs(record)
      this.#setAttributes(record)
      this.#setConditionNotes(record)
    }

    /**
     * Creates option elements for all record CONDITIONS in the database.
     *
     * @param {object} record - The record object.
     */
    #createConditionOptions() {
      this.#conditionOptions.forEach((condition) => {
        const option = document.createElement('option')
        option.value = condition.id
        option.textContent = condition.conditionName
        this.shadowRoot
          .querySelector('select[name="mediaConditionId"]')
          .append(option)
        const optionCopy = option.cloneNode(true)
        this.shadowRoot
          .querySelector('select[name="sleeveConditionId"]')
          .append(optionCopy)
      })
    }

    /**
     * Sets the radio button that correspons to the the records saved RPM to "checked".
     *
     * @param {object} record - The record object.
     */
    #setRPMs(record) {
      if (record.rpm === null) {
        this.shadowRoot.querySelector('#_N_A').checked = true
      } else {
        const checkedRPM = this.shadowRoot.querySelector(`#_${record.rpm}`)
        checkedRPM.checked = true
      }
    }

    #setAttributes(record) {
      this.shadowRoot.querySelector('select[name="mediaConditionId"]').value =
        String(record.mediaConditionId)
      this.shadowRoot.querySelector('select[name="sleeveConditionId"]').value =
        String(record.sleeveConditionId)
    }

    #setConditionNotes(record) {
      this.shadowRoot.querySelector('#mediaConditionNotes').value =
        record.mediaConditionNotes || ''
      this.shadowRoot.querySelector('#sleeveConditionNotes').value =
        record.sleeveConditionNotes || ''
    }
  }
)
