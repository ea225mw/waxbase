import './components/wb-selected-record/wb-selected-record.js'
import './components/wb-records-table/wb-records-table.js'
import './components/wb-edit-record/wb-edit-record.js'
// import './components/wb-edit-record/wb-new-record.js'
import './components/wb-statistics/wb-statistics.js'
import './components/wb-search-discogs/wb-search-discogs.js'
import './components/wb-menubar/wb-menubar.js'
import { baseURLClient } from './config/variables.js'
import { getTheme, themeID } from './config/colorThemes.js'
import { ServerCaller } from './ServerCaller.js'

let allArtists
let allFormats
let allConditions
let allStores

const theme = getTheme(themeID)
const serverCaller = new ServerCaller(baseURLClient)

const wbSelectedRecord = document.createElement('wb-selected-record')
document.querySelector('#selectedRecordView').append(wbSelectedRecord)

setApplicationData()
setColors()

async function setApplicationData() {
  const object = await serverCaller.fetchApplicationData()

  allArtists = object.allArtists
  allFormats = object.allFormats
  allConditions = object.allConditions
  allStores = object.allStores
}

/* ---------- THE RECORD TABLE ---------- */
const wbRecordsTable = document.createElement('wb-records-table')
document.querySelector('#page').append(wbRecordsTable)
getAllRecords()

async function getAllRecords() {
  const allRecords = await serverCaller.fetchAllRecordsFromServer()
  wbRecordsTable.populateRecordsTable(allRecords)
}

wbRecordsTable.addEventListener('showSelectedRecord', async (event) => {
  document.querySelector('#noRecordSelected').style.display = 'none'
  const record = await serverCaller.fetchRecordFromServer(event.detail.recordId)
  wbSelectedRecord.showSelectedRecord(record)
})

/* ---------- THE STATISTICS BAR ---------- */
const wbStatistics = document.querySelector('wb-statistics')
getAndUpdateStatistics()

async function getAndUpdateStatistics() {
  const statistics = await serverCaller.fetchStatistics()
  wbStatistics.updateStatistics(statistics)
}

/* ---------- THE SELECTED RECORD VIEW ---------- */
wbSelectedRecord.addEventListener('showEditView', async (event) => {
  const editView = createAndInitializeEditView()
  document.body.append(editView)
  const recordFetchedFromServer = await serverCaller.fetchRecordFromServer(event.detail.id)
  editView.showEditViewForSelectedRecord(recordFetchedFromServer)

  editView.addEventListener('albumUpdated', (event) => {
    wbSelectedRecord.showSelectedRecord(event.detail.updatedAlbum)
    wbRecordsTable.updateTableRow(event.detail.updatedAlbum)
    getAndUpdateStatistics()
  })
})

wbSelectedRecord.addEventListener('recordDeleted', (event) => {
  wbRecordsTable.removeDeletedRecordFromTable(event.detail.id)
  wbStatistics.updateStatistics()
  document.querySelector('#noRecordSelected').style.display = 'block'
})

function createAndInitializeEditView() {
  const editView = document.createElement('wb-edit-record')
  editView.setCommonRecordData(allArtists, allFormats, allConditions, allStores)
  return editView
}

/* ---------- SET COLORS ---------- */

function setColors() {
  document.querySelector('body').style.backgroundColor = `${theme.mainBackground}`
  document.querySelector('#page').style.backgroundColor = `${theme.mainBackground}`
  document.querySelector('#headerDiv').style.backgroundColor = `${theme.buttonsPlates}`
}

/* ---------- MENUBAR ---------- */

const wbMenubar = document.querySelector('wb-menubar')

wbMenubar.addEventListener('manually', () => {
  console.log('manually clicked!')
  const editViewForNewRecord = createAndInitializeEditView()
  editViewForNewRecord.setDisplayToBlock()
  document.body.append(editViewForNewRecord)

  /* const newRecordView = document.createElement('wb-new-record')
  document.body.append(newRecordView)
  newRecordView.setCommonRecordData(allArtists, allFormats, allConditions, allStores)
  newRecordView.newEmptyRecord()

  newRecordView.addEventListener('recordAdded', (event) => {
    newRecordAdded(event)
  })*/
})

wbMenubar.addEventListener('bySearching', () => {
  const wbSearchDiscogs = document.createElement('wb-search-discogs')
  document.body.append(wbSearchDiscogs)
  wbSearchDiscogs.addEventListener('getOneResourceFromDiscogs', (event) => {
    getOneDiscogsResource(event.detail.resource_url)
  })
})

/**
 * Called when the custom event 'recordAdded' is dispatched from wb-new-record component.
 *
 * @param {CustomEvent} event - The 'recordAdded' event.
 */
function newRecordAdded(event) {
  wbRecordsTable.setRecordDataToRowAndItsChildren(event.detail.addedRecord)
  wbRecordsTable.selectRowToHighlight(event.detail.addedRecord.id)
  wbSelectedRecord.showSingleRecord(event.detail.addedRecord)
  document.querySelector('#noRecordSelected').style.display = 'none'
  wbStatistics.updateStatistics()
}

async function getOneDiscogsResource(url) {
  const record = await serverCaller.fetchOneResourceFromDiscogs(url)
  if (record) {
    document.querySelector('wb-search-discogs').remove()
    createNewDiscogsRecord(record)
  }
}

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
