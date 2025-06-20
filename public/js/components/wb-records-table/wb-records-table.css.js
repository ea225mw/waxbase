import { getTheme, themeID } from '../../config/colorThemes.js'

const theme = getTheme(themeID)

export const cssTemplate =
// eslint-disable-next-line
/*css*/`
:host {
  grid-area: main;
  margin: 1.25rem;
}

#tableWrapper {
  background-color: ${theme.buttonsPlates};
  padding: 1.25rem;
  width: fit-content;
}

.scroll-container {
  position: relative;
  overflow-y: auto;
  max-height: 70vh;
}

#allRecordsTable  {
  font-size: 1 rem;
  display: block;
  border-collapse: collapse;
  padding: 0.625rem;
  border-spacing: 0.1875rem 0.1875rem;
  background-color: ${theme.evenRows};
  width: fit-content;
}

#allRecordsTable th, #allRecordsTable td {
  padding: 0.25rem 0.625rem;
  height: 1.25rem;
  margin-top: 0.1875rem;
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
max-width: 6.25rem;
text-align: center;
}

th {
  border-bottom: solid black 2px;
  border-left: solid rgb(126, 126, 126) 2px;
  border-top: solid rgb(126, 126, 126) 2px;
  font-size: 1.1rem;
  background-color: ${theme.th};
  color: ${theme.generalText};
}

th:nth-last-child(n) {
  border-right: solid rgb(126, 126, 126) 2px;
}

td {
  border-left: solid lightgrey 1px;
}

td:nth-last-child(n) {
  border-right: solid lightgrey 1px;
}
`
