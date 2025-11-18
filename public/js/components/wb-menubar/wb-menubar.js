import { cssTemplate } from './wb-menubar.css.js'
import { htmlTemplate } from './wb-menubar.html.js'
import { renderTemplates } from '../../commonMethods.js'

customElements.define(
  'wb-menubar',
  /**
   *
   */
  class extends HTMLElement {
    #menubar
    /**
     * Creates a new instance of the wb-menubar web component.
     */
    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
      renderTemplates(cssTemplate, htmlTemplate, this.shadowRoot)
    }

    /**
     * Called when the component is added to DOM.
     */
    connectedCallback() {
      this.#menubar = this.shadowRoot.querySelector('#menubar')

      this.#menubar.addEventListener('click', (event) => {
        if (event.target.classList.contains('menu-buttons')) {
          this.displayMenuChoices(event)
        } else if (event.target.tagName === 'LI') {
          const choice = event.target.closest('li')
          this.dispatchEvent(new CustomEvent(`${choice.dataset.choice}`))
          this.hideAllMenus()
        }
      })
    }

    displayMenuChoices(event) {
      const allLists = this.shadowRoot.querySelectorAll('ul')
      const allColumns = this.shadowRoot.querySelectorAll('.columns')

      allLists.forEach((list) => {
        list.classList.remove('visible')
      })

      const column = event.target.closest('.columns')

      if (!column) {
        return
      }

      if (column.classList.contains('displayed')) {
        column.classList.remove('displayed')
        column.querySelector('ul').classList.remove('visible')
      } else {
        allColumns.forEach((column) => {
          column.classList.remove('displayed')
        })
        column.classList.add('displayed')
        column.querySelector('ul').classList.add('visible')
      }
    }

    /**
     * Hides all visible menus.
     */
    hideAllMenus() {
      const allLists = this.shadowRoot.querySelectorAll('ul')
      allLists.forEach((list) => {
        list.classList.remove('visible')
      })
    }
  }
)
