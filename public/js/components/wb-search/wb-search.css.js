import { getTheme, themeID } from '../../config/colorThemes.js'

const theme = getTheme(themeID)

export const cssTemplate =
// eslint-disable-next-line
/*css*/`
form {
  display: flex;
  flex-direction: column;
  background-color: lightblue;
  max-width: 280px;
  padding: 20px;
}

input {
  max-width: 250px;
  margin-bottom: 15px;
}

label {
  margin-bottom: 3px;
}

div {
  margin-bottom: 15px;
}

.backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.43);
}

#searchWrapper {
  display: flex;
  position: absolute;
  top: 15vh;
  left: 50%;
  transform: translate(-50%);
}

#searchResultDiv {
  background-color: #89A8B2;
  min-width: 50vw;
  max-height: 75vh;
  padding: 20px;
}

h1 {
  font-size: 20px;
}

#scroll-container {
  position: relative;
  overflow-y: auto;
  max-height: 70vh;
}

#searchResultTable {
  border-collapse: collapse;
  background-color: ${theme.modal};
  padding: 10px;
}

#searchResultTable tr {
  cursor: default;
}

#searchResultTable th {
  padding: 3px 15px;
  border-left: solid 0.5px black;
  position: sticky;
  box-shadow: 0px 1px 0px black;  
  top: 0;
  z-index: 2;
  background-color: lightblue;
}

.formatTD {
  max-width: 20vw;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
}

#searchResultTable tr:nth-child(odd) {
  background-color: ${theme.oddRows};
}

#searchResultTable tr:nth-child(even) {
  background-color: ${theme.evenRows};
}

#searchResultTable tr.selected {
  background-color: ${theme.selectedRow};
  color: ${theme.selectedRowText};
}

#searchResultTable td {
  padding: 3px 10px;
  border: solid black 0.5px;
}

#searchResultTable td.addToCollectionTD {
  display: none;
  align-items: center;
  color: white;
  border: none; 
}

#searchResultTable button {
  max-width: 250px;
  white-space: nowrap;
  border: solid 1px black;
  padding: 1px;
}

#buttonsDiv {
  display: flex;
  justify-content: space-evenly;
}
`
