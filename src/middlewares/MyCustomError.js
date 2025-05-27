/**
 * A custom made Error class.
 */
export class MyCustomError extends Error {
  /**
   * Creates a new MyCustomError.
   *
   * @param {number} status - The status code of the error.
   * @param {string} message - The message of the error.
   */
  constructor (status, message) {
    super(message)
    this.status = status
  }
}
