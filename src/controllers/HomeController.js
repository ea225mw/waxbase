/**
 * @file Defines the HomeController class.
 * @module controllers/HomeController
 * @author Emanuel Andersen
 */

/**
 * Encapsulates a controller.
 */
export class HomeController {
  /**
   * Renders the home view (startpage) and sends the rendered HTML string as an HTTP response.
   * index GET.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async index (req, res, next) {
    /* const response = await fetch(process.env.ALL_ALBUMS_URL)
    const viewData = await response.json() */
    res.render('main/index'/*, { viewData } */)
  }
}
