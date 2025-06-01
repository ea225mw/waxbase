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

    console.log(req.body)

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

    const response = await fetch(url, {
      headers: {
        Authorization: `Discogs token=${process.env.DISCOGS_TOKEN}`
      }
    })

    if (!response.ok) throw new Error('API-anrop misslyckades')

    const data = await response.json()
    res.json(data)
  }
}
