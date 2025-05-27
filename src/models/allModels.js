import { Sequelize } from 'sequelize'
import { defineArtist } from './artistModel.js'
import { defineAlbum } from './albumModel.js'
import { defineTrack } from './trackModel.js'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '../database/WB_test.db',
  logging: false
})

const Artist = defineArtist(sequelize)
const Album = defineAlbum(sequelize)
const Track = defineTrack(sequelize)

// Definiera relationer efter att modellerna skapats
Artist.hasMany(Album, { foreignKey: 'artist' })
Album.belongsTo(Artist, { foreignKey: 'artist' })

Album.hasMany(Track, { foreignKey: 'album' })
Track.belongsTo(Album, { foreignKey: 'album' })

export { sequelize, Artist, Album, Track }
