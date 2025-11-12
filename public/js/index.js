import './components/wb-selected-record/wb-selected-record.js'
import './components/wb-records-table/wb-records-table.js'
import './components/wb-edit-record/wb-edit-record.js'
import './components/wb-edit-record/wb-new-record.js'
import './components/wb-statistics/wb-statistics.js'
import './components/wb-search-discogs/wb-search-discogs.js'
import './components/wb-menubar/wb-menubar.js'
import { baseURLClient } from './config/variables.js'
import { getTheme, themeID } from './config/colorThemes.js'

let allArtists
let allFormats
let allConditions
let allStores

const theme = getTheme(themeID)

fetchApplicationData()
setColors()

const wbSelectedRecord = document.createElement('wb-selected-record')
document.querySelector('#selectedRecordView').append(wbSelectedRecord)

/**
 * Fetches common data that different components have use for.
 */
async function fetchApplicationData() {
  const response = await fetch(`${baseURLClient}records/commonData`)
  const object = await response.json()

  allArtists = object.allArtists
  allFormats = object.allFormats
  allConditions = object.allConditions
  allStores = object.allStores
}

async function getRecordFromServer(recordIndex) {
  return await fetch(`${baseURLClient}records/viewSingleAlbum`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: recordIndex
    })
  })
}

/* ---------- THE RECORD TABLE ---------- */
const wbRecordsTable = document.createElement('wb-records-table')
document.querySelector('#page').append(wbRecordsTable)

wbRecordsTable.addEventListener('showSingleRecord', async (event) => {
  document.querySelector('#noRecordSelected').style.display = 'none'
  const response = await getRecordFromServer(event.detail.recordId)
  const record = await response.json()
  wbSelectedRecord.showSelectedRecord(record)
})

/* ---------- THE STATISTICS BAR ---------- */
const wbStatistics = document.querySelector('wb-statistics')

/* ---------- THE SELECTED RECORD VIEW ---------- */
wbSelectedRecord.addEventListener('showEditView', async (event) => {
  const editView = document.createElement('wb-edit-record')
  document.body.append(editView)
  editView.setCommonRecordData(allArtists, allFormats, allConditions, allStores)
  const response = await getRecordFromServer(event.detail.id)
  const recordFetchedFromServer = await response.json()
  editView.showEditView(recordFetchedFromServer)

  editView.addEventListener('albumUpdated', (event) => {
    wbSelectedRecord.showSelectedRecord(event.detail.updatedAlbum)
    wbRecordsTable.updateTableRow(event.detail.updatedAlbum)
    wbStatistics.updateStatistics()
  })
})

wbSelectedRecord.addEventListener('recordDeleted', (event) => {
  wbRecordsTable.removeDeletedRecord(event.detail.id)
  wbStatistics.updateStatistics()
  document.querySelector('#noRecordSelected').style.display = 'block'
})

/* ---------- SET COLORS ---------- */
/**
 * Sets colors to certain elements.
 */
function setColors() {
  document.querySelector('body').style.backgroundColor = `${theme.mainBackground}`
  document.querySelector('#page').style.backgroundColor = `${theme.mainBackground}`
  document.querySelector('#headerDiv').style.backgroundColor = `${theme.buttonsPlates}`
}

/* ---------- MENUBAR ---------- */

const wbMenubar = document.querySelector('wb-menubar')

wbMenubar.addEventListener('manually', () => {
  const newRecordView = document.createElement('wb-new-record')
  document.body.append(newRecordView)
  newRecordView.setCommonRecordData(allArtists, allFormats, allConditions, allStores)
  newRecordView.newEmptyRecord()

  newRecordView.addEventListener('recordAdded', (event) => {
    newRecordAdded(event)
  })
})

wbMenubar.addEventListener('bySearching', () => {
  const wbSearchDiscogs = document.createElement('wb-search-discogs')
  document.body.append(wbSearchDiscogs)
  wbSearchDiscogs.addEventListener('getOneResourceFromDiscogs', (event) => {
    getOneResourceFromDiscogs(event.detail.resource_url)
  })
})

/**
 * Called when the custom event 'recordAdded' is dispatched from wb-new-record component.
 *
 * @param {CustomEvent} event - The 'recordAdded' event.
 */
function newRecordAdded(event) {
  wbRecordsTable.setRecordData(event.detail.addedRecord)
  wbRecordsTable.selectRowToHighlight(event.detail.addedRecord.id)
  wbSelectedRecord.showSingleRecord(event.detail.addedRecord)
  document.querySelector('#noRecordSelected').style.display = 'none'
  wbStatistics.updateStatistics()
}

/**
 * Gets a Discogs release (record) from the passed URL.
 *
 * @param {URL} url - The Discogs API URL.
 */
async function getOneResourceFromDiscogs(url) {
  const response = await fetch(`${baseURLClient}search/getDiscogsResource`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ resource_url: url })
  })
  const record = await response.json()
  if (record) {
    document.querySelector('wb-search-discogs').remove()
    createNewDiscogsRecord(record)
  }
}

/**
 * Creates a new record to be added to the collection based on the info from the Discogs release.
 * Called when there is a successful fetch in getOneResourceFromDiscogs().
 *
 * @param {object} record - The fetched record object.
 */
function createNewDiscogsRecord(record) {
  // console.log('record in createNewDiscogsRecord: ', record)
  const newDiscogsRecord = document.createElement('wb-new-record')
  document.body.append(newDiscogsRecord)
  newDiscogsRecord.setCommonRecordData(allArtists, allFormats, allConditions, allStores)
  newDiscogsRecord.newDiscogsRecord(record)
  newDiscogsRecord.addEventListener('recordAdded', (event) => {
    newRecordAdded(event)
  })
}
