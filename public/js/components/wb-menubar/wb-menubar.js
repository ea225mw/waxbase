import { cssTemplate } from './wb-menubar.css.js'
import { htmlTemplate } from './wb-menubar.html.js'
import { renderTemplates } from '../../commonMethods.js'

customElements.define('wb-menubar',
  /**
   *
   */
  class extends HTMLElement {
    #menubar
    /**
     *
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      renderTemplates(cssTemplate, htmlTemplate, this.shadowRoot)
    }

    /**
     *
     */
    connectedCallback () {
      this.#menubar = this.shadowRoot.querySelector('#menubar')

      this.#menubar.addEventListener('click', (event) => {
        if (event.target.classList.contains('menu-buttons')) {
          console.log('Menu buttons clicked!')
          this.displayMenuChoices(event)
        } else if (event.target.tagName === 'LI') {
          console.log('Choice made')
        }
      })
    }

    /**
     *
     * @param event
     */
    displayMenuChoices (event) {
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
  }
)
