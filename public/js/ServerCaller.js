export class ServerCaller {
  #baseURLClient

  constructor(baseURLClient) {
    this.#baseURLClient = baseURLClient
  }

  async fetchApplicationData() {
    const response = await fetch(`${this.#baseURLClient}records/commonData`)
    return await response.json()
  }

  async fetchRecordFromServer(recordIndex) {
    const response = await fetch(`${this.#baseURLClient}records/viewSingleAlbum`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: recordIndex
      })
    })
    return await response.json()
  }

  async fetchStatistics() {
    const respone = await fetch(`${this.#baseURLClient}records/statistics`)
    return await respone.json()
  }

  async fetchOneResourceFromDiscogs(url) {
    const response = await fetch(`${this.#baseURLClient}search/getDiscogsResource`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ resource_url: url })
    })
    return await response.json()
  }

  async fetchAllRecordsFromServer() {
    const response = await fetch(`${this.#baseURLClient}records/allalbums`)
    return await response.json()
  }
}
