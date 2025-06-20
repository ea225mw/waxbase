/**
 *
 */
export class SearchController {
  /**
   * Searches for a record on Discogs based on artist, record title and format.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express respone object.
   */
  async searchRecord (req, res) {
    const discogsURL = new URL(process.env.DISCOGS_API_URL)

    // console.log('req.body: ', req.body)

    const mapping = {
      artist: req.body.artist,
      title: req.body.title,
      format: req.body.format,
      catno: req.body.catno
    }
    discogsURL.searchParams.append('type', 'release')
    for (const key in mapping) {
      const value = req.body[key]
      if (value) {
        discogsURL.searchParams.append(`${key}`, value)
      }
    }

    // console.log('updated url: ', url)

    const searchResponse = await fetch(discogsURL, {
      headers: {
        Authorization: `Discogs token=${process.env.DISCOGS_TOKEN}`
      }
    })

    const discogsData = await searchResponse.json()
    // console.log('discogsData: ', discogsData)

    // If the search results in no matches:
    if (discogsData.pagination.items === 0) {
      res.json({ typeOfResponse: 'NoResults', message: 'No results on that search.' })
      return
    }

    if (discogsData.pagination.items >= 1) {
      const returnedObject = {
        typeOfResponse: 'MultipleRecords',
        data: discogsData
      }
      res.json(returnedObject)
    }
  }

  /**
   * Get one specific Discogs release based on release ID.
   *
   * @param {URL} url - The Discogs API URL.
   * @returns {object} - The release as a JSON object.
   */
  async fetchOneDiscogsResource (url) {
    // console.log('url in fetchOneDiscogsResource', url)
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Discogs token=${process.env.DISCOGS_TOKEN}`
        }
      })
      const resource = await response.json()
      return resource
    } catch (error) {
      console.log(error)
    }
  }

  /**
   *
   * @param req
   * @param res
   */
  async getDiscogsResource (req, res) {
    try {
      const resource = await this.fetchOneDiscogsResource(req.body.resource_url)
      res.json(resource)
    } catch (error) {
      console.log(error)
    }
  }
}
