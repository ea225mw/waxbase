import express from 'express'
import { router as homeRouter } from './homeRouter.js'
import { router as recordRouter } from './recordRouter.js'
import { router as searchRouter } from './searchRouter.js'

export const router = express.Router()

router.use('/', homeRouter)
router.use('/records', recordRouter)
router.use('/search', searchRouter)
