import { getTheme, themeID } from '../../config/colorThemes.js'

const theme = getTheme(themeID)

export const cssTemplate =
// eslint-disable-next-line
/*css*/`
:host {
  grid-area: main;
  margin: 20px;
}

#tableWrapper {
  background-color: ${theme.buttonsPlates};
  padding: 20px;
  width: fit-content;
}

#allRecordsTable  {
  display: block;
  border-collapse: collapse;
  padding: 10px;
  border-spacing: 3px 3px;
  background-color: ${theme.evenRows};
  width: fit-content;
}

#allRecordsTable th, #allRecordsTable td {
  padding: 4px 10px;
  height: 20px;
  margin-top: 3px;
  cursor: default;
}

#allRecordsTable tr:nth-child(even) {
  background: ${theme.evenRows};
  color: ${theme.generalText};
}
#allRecordsTable tr:nth-child(odd) {
  background: ${theme.oddRows};
  color: ${theme.generalText};
}

#allRecordsTable tr.selected {
  background-color: ${theme.selectedRow};
  color: ${theme.selectedRowText};
}

.centered {
max-width: 100px;
text-align: center;
}

th {
  border-bottom: solid black 3px;
  border-left: solid rgb(126, 126, 126) 2px;
  border-top: solid rgb(126, 126, 126) 2px;
  font-size: 106%;
  background-color:${theme.mainBackground};
}

th:nth-last-child(n) {
  border-right: solid rgb(126, 126, 126) 2px;
}

td {
  border-left: solid lightgrey 1px;
  font-size: 106%;
}

td:nth-last-child(n) {
  border-right: solid lightgrey 1px;
}
`
