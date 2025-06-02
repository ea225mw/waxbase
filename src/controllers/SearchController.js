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
    const url = new URL(process.env.DISCOGS_API_URL)

    // console.log('req.body: ', req.body)

    const mapping = {
      artist: req.body.artist,
      title: req.body.title,
      format: req.body.format,
      catno: req.body.catno
    }

    for (const key in mapping) {
      const value = req.body[key]
      if (value) {
        url.searchParams.append(`${key}`, value)
      }
    }

    // console.log('updated url: ', url)

    const searchResponse = await fetch(url, {
      headers: {
        Authorization: `Discogs token=${process.env.DISCOGS_TOKEN}`
      }
    })

    const discogsData = await searchResponse.json()
    console.log('discogsData: ', discogsData)

    // If the search results in no matches:
    if (discogsData.pagination.items === 0) {
      res.json('No results on that search.')
      return
    }

    // If the search results in only one match:
    if (discogsData.pagination.items === 1) {
      console.log('Hello from length of one in data.results')
      const resource = await this.fetchOneResource(discogsData.results[0].resource_url)
      const returnedObject = {
        typeOfResponse: 'OneSingleRecord',
        data: resource
      }
      res.json(returnedObject)
      return
    }

    if (discogsData.pagination.items > 1) {
      const returnedObject = {
        typeOfResponse: 'MultipleRecords',
        data: discogsData
      }
      res.json(returnedObject)
    }
    /*
    const masterReleasesURLs = new Set()

    if (data.pagination.items > 1) {
      data.results.forEach(element => {
        if (element.master_url) {
          masterReleasesURLs.add(element.master_url)
        }
      })
      const masterReleasesURLsArray = [...masterReleasesURLs]
    }

    let masterReleasesURLsArray

    if (masterReleasesURLs.size > 0) {
      masterReleasesURLsArray = [...masterReleasesURLs]
      Promise.all(masterReleasesURLsArray.map(url => fetch(url).then(response => response.json())))
        .then(masterReleases => {
        // Här har vi en array med resultaten från alla URL:er
          console.log('results: ', masterReleases)
          res.json(masterReleases)
        })
    } */
  }

  /**
   *
   * @param url
   */
  async fetchOneResource (url) {
    const response = await fetch(url, {
      headers: {
        Authorization: `Discogs token=${process.env.DISCOGS_TOKEN}`
      }
    })
    const resource = await response.json()
    return resource
  }
}
