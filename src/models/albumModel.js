import { DataTypes, Model, Sequelize } from 'sequelize'

/**
 * Defines the Album model.
 *
 * @param {Sequelize} sequelize - An instance of Sequalize.
 * @returns {Model} - The AlbumModel.
 */
export function defineAlbum (sequelize) {
  return sequelize.define('album', {
    albumTitle: DataTypes.TEXT,
    releaseYear: DataTypes.INTEGER,
    origReleaseYear: DataTypes.INTEGER,
    artist: {
      type: DataTypes.INTEGER,
      references: {
        model: 'artists',
        key: 'id'
      }
    },
    format: {
      type: DataTypes.INTEGER,
      references: {
        model: 'formats',
        key: 'id'
      }
    }
  })
}
