import request from 'supertest'
import app from '../src/server.js'
import { sequelize, models } from '../src/config/sequelize.js'

beforeAll(async () => {
  await sequelize.sync({ force: true })

  const artist1 = await models.Artist.create(
    { firstName: 'Billy', lastName: 'Joel', the: null }
  )
  const format1 = await models.Format.create({ format: 'CD' })
  const condition1 = await models.Condition.create({ conditionName: 'Mint' })
  const store1 = await models.Store.create({ storeName: 'Ginza Musik' })
  await models.Album.create({
    albumTitle: 'The Stranger',
    releaseYear: 1998,
    origReleaseYear: 1977,
    artistId: artist1.id,
    price: 50,
    imgURL: null,
    storeId: store1.id,
    formatId: format1.id,
    sleeveConditionId: condition1.id,
    mediaConditionId: condition1.id,
    rpm: null
  })
})

describe('GET /records/commonData', () => {
  it('should return common data as JSON', async () => {
    const response = await request(app).get('/records/commonData')

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('allArtists')
    expect(response.body).toHaveProperty('allFormats')
    expect(response.body).toHaveProperty('allConditions')
    expect(response.body).toHaveProperty('allStores')
  })
})
