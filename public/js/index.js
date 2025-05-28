import './components/wb-single-record/wb-single-record.js'
import './components/wb-records-table/wb-records-table.js'
import './components/wb-edit-record/wb-edit-record.js'
import './components/wb-edit-record/wb-new-record.js'
import './components/wb-statistics/wb-statistics.js'
import { baseURLClient } from './config/variables.js'
import { getTheme, themeID } from './config/colorThemes.js'

let allArtists
let allFormats
let allConditions
let allStores

const theme = getTheme(themeID)

fetchApplicationRecordData()
setColors()

const wbSingleRecord = document.createElement('wb-single-record')
document.querySelector('#singleRecordView').append(wbSingleRecord)

/**
 * Fetches common data that other components have use for.
 */
async function fetchApplicationRecordData () {
  const response = await fetch(`${baseURLClient}records/commonData`)
  const object = await response.json()

  allArtists = object.allArtists
  allFormats = object.allFormats
  allConditions = object.allConditions
  allStores = object.allStores
}

/* ---------- THE RECORD TABLE ---------- */
const wbRecordsTable = document.createElement('wb-records-table')
document.querySelector('#page').append(wbRecordsTable)

wbRecordsTable.addEventListener('showSingleRecord', (event) => {
  document.querySelector('#noRecordSelected').style.display = 'none'
  wbSingleRecord.showSingleRecord(event.detail.rec)
})

/* ---------- THE STATISTICS BAR ---------- */
const wbStatistics = document.querySelector('wb-statistics')

/* ---------- THE SINGLE RECORD VIEW ---------- */
wbSingleRecord.addEventListener('showEditView', (event) => {
  const editView = document.createElement('wb-edit-record')
  document.body.append(editView)
  editView.setCommonRecordData(allArtists, allFormats, allConditions, allStores)
  editView.showEditView(event.detail.id)

  editView.addEventListener('albumUpdated', (event) => {
    wbSingleRecord.showSingleRecord(event.detail.updatedAlbum)
    wbRecordsTable.updateTableRow(event.detail.updatedAlbum)
    wbStatistics.updateStatistics()
  })
})
wbSingleRecord.addEventListener('recordDeleted', (event) => {
  wbRecordsTable.removeDeletedRecord(event.detail.id)
  wbStatistics.updateStatistics()
  document.querySelector('#noRecordSelected').style.display = 'block'
})

/* ---------- SET COLORS ---------- */
/**
 * Sets colors to certain elements.
 */
function setColors () {
  document.querySelector('#page').style.backgroundColor = `${theme.mainBackground}`
  document.querySelector('#headerDiv').style.backgroundColor = `${theme.buttonsPlates}`
}

/* ---------- ADD RECORD MANUALLY ---------- */
const addRecordBtn = document.querySelector('#addRecordBtn')
addRecordBtn.addEventListener('click', () => {
  const newRecordView = document.createElement('wb-new-record')
  document.body.append(newRecordView)
  newRecordView.setCommonRecordData(allArtists, allFormats, allConditions, allStores)
  newRecordView.newRecord()

  newRecordView.addEventListener('recordAdded', (event) => {
    wbRecordsTable.setRecordData(event.detail.addedRecord)
    wbRecordsTable.selectRowToHighlight(event.detail.addedRecord.id)
    wbSingleRecord.showSingleRecord(event.detail.addedRecord)
    document.querySelector('#noRecordSelected').style.display = 'none'
    wbStatistics.updateStatistics()
  })
})
