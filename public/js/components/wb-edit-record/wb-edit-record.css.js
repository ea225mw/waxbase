import { getTheme, themeID } from '../../config/colorThemes.js'

const theme = getTheme(themeID)

export const cssTemplate =
 
/*css*/`
:host {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.43);
}

.modal {
  display: grid;
  grid-template:
  "a a" auto
  ". b" 2.95rem
  / auto 8.8rem;
  position: absolute;
  top: 10rem;
  left: 50%;
  transform: translate(-50%);
  background-color: ${theme.modal};
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0.375rem 0.375rem 0.625rem rgba(0, 0, 0, 0.861);
  border: solid black 2px;
  width: 47rem;
  min-height: 35.3rem;
}

form {
  margin: 15px;
  grid-area: a;
}

input, select {
  box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
  padding: 0.1875rem;
  background-color: ${theme.inputAndSelect}
}

label {
  margin-top: 0.75rem;
  margin-bottom: 0.1875rem;
  color: ${theme.generalText}
}

#generalWrapper {
  display: flex;
  flex-direction: column;
  position: relative;
}

select[name="formatId"] {
  max-width: 5.625rem;
}

input[name="albumTitle"], 
input[name="artist"], 
input[name="store"] {
  width: 15.5rem;
}

input[name="releaseYear"], 
input[name="origReleaseYear"], 
input[name="price"]{
  max-width: 3.125rem;
}

#tracksWrapper input {
  width: 28rem;
}

#tabsDiv {
  width: fit-content;
}

button.tab {
  min-width: 3.625rem;
}

#buttonsDiv {
  display: flex;
  position: relative;
  grid-area: b;
  justify-self: center;
  align-self: center;
}

.tab {
  border: none;
  border-top-left-radius: 0.1875rem;
  border-top-right-radius: 0.1875rem;
  box-shadow: none;
  background-color: ${theme.tab};
  color: ${theme.shadedText};
  padding-left: 0.4375rem;
  padding-right: 0.4375rem;
  padding-bottom: 0;
  height: 1.25rem;
  min-width: 4.1rem;
}

.selected-tab {
  background-color: ${theme.selectedTabAndForms};
  color: ${theme.generalText};
}

.forms {
  display: none;
  flex-direction: column;
  padding: 1.25rem;
  background-color: ${theme.selectedTabAndForms};
  border-bottom-left-radius: 0.625rem;
  border-bottom-right-radius: 0.625rem;
  border-top-right-radius: 0.625rem;
}

.selected-form {
  display: flex;
}

#frontCover {
  max-width: 9rem;
}

.inputWithSuggestions {
  display: flex;
  flex-direction: row;
  gap: 0.625rem;
  position: relative;
}

.suggestions {
  position: absolute;
  left: 16.875rem;
  list-style: none;
  margin: 0;
  padding: 0;
  background: white;
  min-width: 12.5rem;
  max-width: 22rem;
}

.suggestions li {
  padding: 0.25rem;
  cursor: pointer;
}

.suggestions li:hover {
  background-color: ${theme.mainBackground};
}

#cancel, #submit {
  min-width: 3.6rem;
}

#validationFailMsg {
  position: absolute;
  top: -1.875rem;
  left: -10rem;
  min-width: 12.5rem;
}
`
