import { DataTypes, Model, Sequelize } from 'sequelize'

/**
 * Defines the Artist model.
 *
 * @param {Sequelize} sequelize - An instance of Sequalize.
 * @returns {Model} - The ArtistModel.
 */
export function defineArtist (sequelize) {
  return sequelize.define('artist', {
    firstName: DataTypes.TEXT,
    lastName: DataTypes.TEXT
  })
}
