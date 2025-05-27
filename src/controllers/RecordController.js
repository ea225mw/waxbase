/**
 * @file Defines the RecordController class.
 * @module controllers/RecordController
 * @author Emanuel Andersen
 */

import { sequelize } from '../config/sequelize.js'
const { models } = sequelize

/**
 * Encapsulates a controller.
 */
export class RecordController {
  #excludeTimestamps = {
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  }

  #excludeTimestampsAndID = {
    attributes: { exclude: ['createdAt', 'updatedAt', 'id'] }
  }

  #concatFullName = `CASE
    WHEN the IS NULL AND firstName IS NULL THEN lastName
    WHEN the IS NOT NULL THEN CONCAT(the, ' ', lastName)
    ELSE CONCAT(firstName, ' ', lastName)
    END`

  /**
   * Gets the data that is common for more than one component in the application.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express respone object.
   */
  async getCommonData (req, res) {
    const allArtists = await this.getAllArtists()
    const allFormats = await this.getAllFormats()
    const allConditions = await this.getAllConditions()
    const allStores = await this.getAllStores()
    res.json({ allArtists, allFormats, allConditions, allStores })
  }

  /**
   * Gets all record saved in the database.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express respone object.
   */
  async getAllAlbums (req, res) {
    try {
      const albums = await models.album.findAll({
        ...this.#excludeTimestamps,
        include: [
          {
            model: models.artist,
            attributes: [
              [
                sequelize.literal(`
                  CASE
                    WHEN the IS NULL AND firstName IS NULL THEN lastName
                    WHEN the IS NOT NULL THEN CONCAT(lastName, ', ', the)
                    ELSE CONCAT(lastName, ', ', firstName)
                  END
                `),
                'fullName'
              ]
            ]
          },
          { model: models.store, ...this.#excludeTimestampsAndID },
          { model: models.format, ...this.#excludeTimestampsAndID },
          { model: models.condition, as: 'sleeveCondition', attributes: ['conditionName'] },
          { model: models.condition, as: 'mediaCondition', attributes: ['conditionName'] }
        ]
      })
      res.json(albums)
    } catch (error) {
      console.error('Fel vid hämtning av album:', error)
    }
  }

  /**
   * Gets all artists from the database.
   *
   * @returns {Array} - An array with all artists.
   */
  async getAllArtists () {
    const artists = await models.artist.findAll({
      attributes: [
        'id', 'firstName', 'lastName', 'the',
        [
          sequelize.literal(`${this.#concatFullName}`),
          'fullName'
        ]
      ]
    })
    return artists
  }

  /**
   * Gets all record formats from the database.
   *
   * @returns {Array} - An array with all record formats.
   */
  async getAllFormats () {
    const formats = await models.format.findAll({ ...this.#excludeTimestamps })
    return formats
  }

  /**
   * Gets all artists from the database.
   *
   * @returns {Array} - An array with all conditions.
   */
  async getAllConditions () {
    const conditions = await models.condition.findAll({ ...this.#excludeTimestamps })
    return conditions
  }

  /**
   * Gets all stores from the database.
   *
   * @returns {Array} - An array with all stores.
   */
  async getAllStores () {
    const stores = await models.store.findAll({ ...this.#excludeTimestamps })
    return stores
  }

  /**
   * Responds with the album called up in getAlbumById and returns it as JSON.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express respone object.
   */
  async getSingleAlbum (req, res) {
    const album = await this.getAlbumById(req.body.id)
    res.json(album)
  }

  /**
   * Gets and returns the total amount spent on the collection.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express respone object.
   */
  async getStatistics (req, res) {
    const totalPrice = await models.album.sum('price')
    const albumCount = await models.album.count()

    res.json({ totalPrice, albumCount })
  }

  /**
   * Gets an single album from the database based on ID.
   *
   * @param {number} id - The ID of the album.
   * @returns {object} album - The found album.
   */
  async getAlbumById (id) {
    try {
      const album = await models.album.findByPk(id, {
        ...this.#excludeTimestamps,
        include: [
          {
            model: models.artist,
            attributes: [
              [
                sequelize.literal(`${this.#concatFullName}`),
                'fullName'
              ]
            ]
          },
          {
            model: models.store,
            ...this.#excludeTimestamps
          },
          {
            model: models.format,
            ...this.#excludeTimestamps
          },
          {
            model: models.track,
            ...this.#excludeTimestamps
          },
          { model: models.condition, as: 'sleeveCondition', attributes: ['conditionName'] },
          { model: models.condition, as: 'mediaCondition', attributes: ['conditionName'] }
        ]
      })

      return album
    } catch (error) {
      console.error('Fel vid hämtning av album:', error)
    }
  }

  /**
   * Saves an edited record in the database.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express respone object.
   * @returns {void}
   */
  async updateAlbum (req, res) {
    try {
      const album = await this.getAlbumById(req.body.id)

      if (!album) {
        return res.status(404).send('Album not found')
      }

      await album.update({
        albumTitle: req.body.albumTitle || null,
        releaseYear: req.body.releaseYear || null,
        origReleaseYear: req.body.origReleaseYear || null,
        price: req.body.price || null,
        imgURL: req.body.imgURL || null,
        formatId: req.body.formatId || null,
        storeId: req.body.storeId || null,
        artistId: req.body.artistId || null,
        mediaConditionId: req.body.mediaConditionId || null,
        sleeveConditionId: req.body.sleeveConditionId || null,
        rpm: req.body.rpm
      })

      await this.prepareTracks(req.body.tracks, album)

      if (req.body.tracksToBeRemoved) {
        const trackIDsToDelete = JSON.parse(req.body.tracksToBeRemoved)
        for (const id of trackIDsToDelete) {
          const foundTrack = await models.track.findByPk(id)
          foundTrack.destroy()
        }
      }

      const updatedAlbum = await this.getAlbumById(req.body.id)
      res.send(updatedAlbum)
    } catch (error) {
      console.error('Fel vid uppdatering av album:', error)
      res.status(500).send(error)
    }
  }

  /**
   * Updates existing tracks or saves new tracks.
   *
   * @param {JSON} tracks - The tracks array as JSON string.
   * @param {object} album - The album object.
   */
  async prepareTracks (tracks, album) {
    const allTracks = JSON.parse(tracks)
    for (const trackData of allTracks) {
      const existingTrack = await models.track.findByPk(trackData.id)

      if (existingTrack) {
        await existingTrack.update({
          trackTitle: trackData.trackTitle || null,
          minutes: trackData.minutes || 0,
          seconds: trackData.seconds || 0
        })
      } else {
        await models.track.create({
          trackIndex: trackData.trackIndex,
          trackTitle: trackData.trackTitle || null,
          minutes: trackData.minutes || null,
          seconds: trackData.seconds || null,
          albumId: album.id
        })
      }
    }
  }

  /**
   * Saves a new record to the database.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express respone object.
   */
  async saveNewRecord (req, res) {
    try {
      const album = await models.album.create({
        albumTitle: req.body.albumTitle,
        releaseYear: req.body.releaseYear || null,
        origReleaseYear: req.body.origReleaseYear || null,
        price: req.body.price || null,
        imgURL: req.body.imgURL || null,
        artistId: req.body.artistId || null,
        storeId: req.body.storeId || null,
        formatId: req.body.formatId || null,
        mediaConditionId: req.body.mediaConditionId || null,
        sleeveConditionId: req.body.sleeveConditionId || null,
        rpm: req.body.rpm
      })
      await this.prepareTracks(req.body.tracks, album)

      const createdAlbum = await models.album.findByPk(album.id, {
        include: [
          {
            model: models.artist,
            attributes: [
              'id',
              [sequelize.literal(`${this.#concatFullName}`), 'fullName']
            ]
          }
        ]
      })

      res.status(201).json(createdAlbum)
    } catch (error) {
      console.error('Fel vid skapande av nytt album:', error)
      res.status(500).send('Något gick fel vid skapandet av album')
    }
  }

  /**
   * Deletes a record and all trakcs belonging to that record.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express respone object.
   */
  async deleteRecord (req, res) {
    try {
      const record = await this.getAlbumById(req.body.id)

      await models.track.destroy({
        where: { albumId: record.id }
      })

      await record.destroy()
      res.status(204).send('Album deleted.')
    } catch (error) {
      res.status(404).send('Album not found')
    }
  }
}
