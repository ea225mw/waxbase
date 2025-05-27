import http from 'node:http'
import { logger } from '../config/winston.js'

/**
 * Error handling.
 *
 * @param {Error} err - The Error object.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} This middleware does not return anything explicitly, it sends a response.
 */
export const errorHandler = (err, req, res, next) => {
  logger.error(err.message, { error: err })

  if (process.env.NODE_ENV === 'production') {
    if (!err.status) {
      err.status = 500
      err.message = http.STATUS_CODES[err.status]
    }

    return res.status(err.status).json({
      status: err.status,
      message: err.message
    })
  }

  return res.status(err.status || 500).json({ status_code: err.status, message: err.message })
}
