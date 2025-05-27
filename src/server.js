/**
 * @file Defines the main application.
 * @module src/server
 * @author Emanuel Andersen, Mats Loock
 * @version 3.1.0
 */

import cors from 'cors'
import express from 'express'
import httpContext from 'express-http-context' // Must be first!
import expressLayouts from 'express-ejs-layouts'
import path, { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import helmet from 'helmet'
import { sequelize } from './config/sequelize.js'
import { morganLogger } from './config/morgan.js'
import { logger } from './config/winston.js'
import { router } from './routes/router.js'
import { errorHandler } from './middlewares/errorHandler.js'

// Create an Express application.
const app = express()
export default app

// Set various HTTP headers to make the application little more secure (https://www.npmjs.com/package/helmet).
app.use(helmet())

// Enable Cross Origin Resource Sharing (CORS) (https://www.npmjs.com/package/cors).
app.use(cors())

// Get the directory name of this module's path.
const directoryFullName = dirname(fileURLToPath(import.meta.url))

// Set the base URL to use for all relative URLs in a document.
const baseURL = process.env.BASE_URL || '/'

// View engine setup.
app.set('view engine', 'ejs')
app.set('views', join(directoryFullName, 'views'))
app.set('layout', join(directoryFullName, 'views', 'layouts', 'default'))
app.set('layout extractScripts', true)
app.set('layout extractStyles', true)
app.use(expressLayouts)

// Parse requests of the content type application/x-www-form-urlencoded.
// Populates the request object with a body object (req.body).
app.use(express.urlencoded({ extended: false }))

// Parse requests of the content type application/json.
app.use(express.json())

// Serve static files.
app.use(express.static(join(directoryFullName, '..', 'public')))

app.use(httpContext.middleware)

// Use a morgan logger.
app.use(morganLogger)

// Middleware to be executed before the routes.
app.use((req, res, next) => {
  httpContext.set('request', req)

  // Pass the base URL to the views.
  res.locals.baseURL = baseURL

  next()
})

// Register routes.
app.use('/', router)

// Error handler.
app.use(errorHandler)

try {
  try {
    await sequelize.authenticate()
    console.log('Connection to SQLite database has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }

  const PORT = process.env.PORT || 8085

  const __filename = fileURLToPath(import.meta.url)
  const executedFile = path.resolve(process.argv[1])

  // Normalisera till samma Unicode-form (t.ex. NFC = förkomponerad)
  if (__filename.normalize() === executedFile.normalize()) {
    const server = app.listen(PORT, () => {
      logger.info(`Server running at http://localhost:${server.address().port}`)
    })
  }
} catch (err) {
  logger.error(err.message, { error: err })
  process.exitCode = 1
}
