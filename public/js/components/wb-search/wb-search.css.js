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

button {
  max-width: 250px;
  margin-top: 15px;
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
  top: 30%;
  left: 30%;
  transform: translate(-50%, -50%);
}

#searchResultDiv {
  background-color: #89A8B2;
  min-width: 800px;
  padding: 20px;
}

h1 {
  font-size: 20px;
}

#searchResultTable {
  border-collapse: collapse;
  background-color: ${theme.modal};
  padding: 10px;
}

#searchResultTable tr {
  cursor: default;
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
  color: white;
  border: none; 
}

#searchResultTable button {
  margin: 2px;
}

#buttonsDiv {
  display: flex;
  justify-content: space-evenly;
}
`
