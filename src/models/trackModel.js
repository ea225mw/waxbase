import { DataTypes, Model, Sequelize } from 'sequelize'

/**
 * Defines the Track model.
 *
 * @param {Sequelize} sequelize - An instance of Sequalize.
 * @returns {Model} - The TrackModel.
 */
export function defineTrack (sequelize) {
  return sequelize.define('track', {
    trackTitle: DataTypes.TEXT,
    minutes: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0
      }
    },
    seconds: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 59
      }
    },
    album: {
      type: DataTypes.INTEGER,
      references: {
        model: 'albums',
        key: 'id'
      }
    }
  })
}
