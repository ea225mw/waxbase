import { Sequelize, DataTypes } from 'sequelize'
import path from 'path'
import { fileURLToPath } from 'url'

// Behövs om du kör ESM (dvs använder "type": "module" i package.json)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Konstruera sökväg relativt till src/
const dbPath = path.resolve(__dirname, '../../database/WB_test_DB.db')

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: false
})

const Artist = sequelize.define('artist', {
  firstName: DataTypes.TEXT,
  lastName: DataTypes.TEXT,
  displayName: DataTypes.TEXT,
  sortName: DataTypes.TEXT,
  the: DataTypes.TEXT
})

const Store = sequelize.define('store', {
  storeName: DataTypes.TEXT
})

const Format = sequelize.define('format', {
  format: DataTypes.TEXT
})

const Condition = sequelize.define('condition', {
  conditionName: {
    type: DataTypes.TEXT
  }
})

const Album = sequelize.define('album', {
  albumTitle: DataTypes.TEXT,
  releaseYear: DataTypes.INTEGER,
  origReleaseYear: DataTypes.INTEGER,
  price: DataTypes.FLOAT,
  imgURL: DataTypes.TEXT,
  sleeveConditionId: {
    type: DataTypes.INTEGER,
    references: {
      model: Condition,
      key: 'id'
    }
  },
  sleeveConditionNotes: DataTypes.TEXT,
  mediaConditionId: {
    type: DataTypes.INTEGER,
    references: {
      model: Condition,
      key: 'id'
    }
  },
  mediaConditionNotes: DataTypes.TEXT,
  rpm: DataTypes.INTEGER
})

const Track = sequelize.define('track', {
  trackIndex: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1
    }
  },
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
  }
})
Condition.hasMany(Album, { foreignKey: 'sleeveConditionId' })
Album.belongsTo(Condition, { as: 'sleeveCondition', foreignKey: 'sleeveConditionId' })

Condition.hasMany(Album, { foreignKey: 'mediaConditionId' })
Album.belongsTo(Condition, { as: 'mediaCondition', foreignKey: 'mediaConditionId' })

Artist.hasMany(Album)
Album.belongsTo(Artist)

Store.hasMany(Album)
Album.belongsTo(Store)

Format.hasMany(Album)
Album.belongsTo(Format)

Album.hasMany(Track)
Track.belongsTo(Album)

export const models = { Artist, Store, Format, Condition, Album, Track }
