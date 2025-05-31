import { EditRecordBaseClass } from './editRecordBaseClass.js'
import { cssTemplate } from './wb-edit-record.css.js'
import { htmlTemplate } from './wb-edit-record.html.js'
import { renderTemplates } from '../../commonMethods.js'

customElements.define('wb-new-record',
  /**
   * Defines a form tool to add a new record to the database.
   */
  class extends EditRecordBaseClass {
    #cancel
    #submit
    #tabsDiv
    #allConditions = []
    /**
     * Creates a new instance of the wb-new-record web component.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      renderTemplates(cssTemplate, htmlTemplate, this.shadowRoot)
    }

    /**
     * Called when the component is added to DOM.
     */
    connectedCallback () {
      super.connectedCallback()
      // SETTING UP REFERENCES
      this.#cancel = this.shadowRoot.querySelector('#cancel')
      this.#submit = this.shadowRoot.querySelector('#submit')
      this.#tabsDiv = this.shadowRoot.querySelector('#tabsDiv')

      /* ---------- EVENT LISTENERS ---------- */
      this.#cancel.addEventListener('click', () => this.cancel())
      this.#submit.addEventListener('click', (event) => this.submit(event))
      this.#tabsDiv.addEventListener('click', (event) => this.changeFormView(event))
    }

    /**
     * Initial set up of the form for the record being added.
     */
    async newRecord () {
      this.createFormatOptions()
      this.createConditionOptions()

      this.style.display = 'block'
      document.body.style.pointerEvents = 'none'
      this.style.pointerEvents = 'auto'
    }

    /**
     * Submits the form to web server.
     *
     * @param {Event} event - The event dispatched from the clicking the OK button.
     */
    async submit (event) {
      // Send form to web server
      event.preventDefault()

      const formData = new FormData(this.albumEditForm)
      const tracks = this.prepareTracksForSubmission()
      formData.append('tracks', JSON.stringify(tracks))

      const response = await fetch(`${this.baseURLClient}records/saveNewRecord`, {
        method: 'POST',
        body: formData
      })
      const record = await response.json()
      console.log('Record in submit of new record:', record)
      this.dispatchEvent(new CustomEvent('recordAdded', {
        detail: {
          addedRecord: record
        }
      }))
      this.cancel()
    }
  })
