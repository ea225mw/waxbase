import express from 'express'
import { RecordController } from '../controllers/RecordController.js'
import multer from 'multer'
const upload = multer()

export const router = express.Router()

const controller = new RecordController()

router.post('/viewSingleAlbum', (req, res, next) => controller.getSingleAlbum(req, res, next))

router.get('/allalbums', (req, res, next) => controller.getAllAlbums(req, res, next))
// router.get('/allartists', (req, res, next) => controller.getAllArtists(req, res, next))
// router.get('/allformats', (req, res, next) => controller.getAllFormats(req, res, next))
// router.get('/allconditions', (req, res, next) => controller.getAllConditions(req, res, next))
router.get('/commonData', (req, res, next) => controller.getCommonData(req, res, next))
router.get('/statistics', (req, res, next) => controller.getStatistics(req, res, next))

router.post('/delete', (req, res, next) => controller.deleteRecord(req, res, next))
router.post('/save', upload.none(), (req, res, next) => controller.updateAlbum(req, res, next))
router.post('/saveNewRecord', upload.none(), (req, res, next) => controller.saveNewRecord(req, res, next))
router.post('/search', (req, res, next) => controller.searchRecord(req, res, next))
