/* A file with methods common to many components */

/**
 * Renders <style> and <template> elements from template files.
 *
 * @param {string} cssTemplate - The CSS template string.
 * @param {string} htmlTemplate - The HTML template string.
 * @param {object} shadowRoot - The shadow root onto which the templates will be appended.
 */
export function renderTemplates (cssTemplate, htmlTemplate, shadowRoot) {
  const style = document.createElement('style')
  style.textContent = cssTemplate

  const template = document.createElement('template')
  template.innerHTML = htmlTemplate

  shadowRoot.append(style, template.content.cloneNode(true))
}

/**
 * Used in wb-edit-record and wb-new-record.
 *
 * @param {} context - The context onto which the function is applied (this).
 * @returns {object} - The field map object.
 */
export function getFieldMap (context) {
  return {
    artist: context.artistInput,
    albumTitle: context.albumTitle,
    releaseYear: context.releaseYear,
    origReleaseYear: context.origReleaseYear,
    store: context.store,
    price: context.price,
    artistId: context.artistIdHidden,
    storeId: context.storeIdHidden,
    imgURL: context.imgURLHidden
  }
}
