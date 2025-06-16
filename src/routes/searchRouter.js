import express from 'express'
import { SearchController } from '../controllers/SearchController.js'

export const router = express.Router()

const controller = new SearchController()

router.post('/', (req, res) => controller.searchRecord(req, res))
router.post('/getDiscogsResource', (req, res) => controller.getDiscogsResource(req, res))
