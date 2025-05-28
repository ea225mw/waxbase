import { getTheme, themeID } from '../../config/colorThemes.js'

const theme = getTheme(themeID)

export const cssTemplate =
// eslint-disable-next-line
/*css*/`
* {
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }

    :host {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 9999;
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
      ". b" 50px
      / auto 150px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: ${theme.modal};
      padding: 15px;
      border-radius: 8px;
      box-shadow: 6px 6px 10px rgba(0, 0, 0, 0.861);
      min-width: 300px;
      border: solid black 2px;
      width: 800px;
      height: 600px;
    }

    form {
      margin: 15px;
      grid-area: a;
    }

    input, select {
      box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
      padding: 3px;
      background-color: ${theme.inputAndSelect}
    }

    label {
      margin-top: 12px;
      margin-bottom: 3px;
      color: ${theme.generalText}
    }

    #generalWrapper {
      display: flex;
      flex-direction: column;
      position: relative;
    }

    select[name="formatId"] {
      max-width: 90px;
    }

    input[name="albumTitle"], 
    input[name="artist"], 
    input[name="store"] {
      width: 250px;
    }

    input[name="releaseYear"], 
    input[name="origReleaseYear"], 
    input[name="price"]{
      max-width: 50px;
    }

    #tracksWrapper {
      display: flex;
      flex-direction: column;
    }

    #tracksWrapper input {
      width: 450px;
    }

    #tabsDiv {
      width: fit-content;
    }

    button.tab {
      min-width: 58px;
    }

    #buttonsDiv {
      display: flex;
      position: relative;
      grid-area: b;
      justify-self: center;
      align-self: center;
    }

    #detailsWrapper {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  
    input[type="radio"] {
      margin-left: 3px;
      margin-right: 20px;
    }

    .conditionLabel {
      display: inline-block;
      width: 110px;
    }

    .tab {
      border: none;
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
      box-shadow: none;
      background-color: ${theme.tab};
      color: ${theme.shadedText};
      padding-left: 7px;
      padding-right: 7px;
      padding-bottom: 0;
      height: 20px;
      min-width: 65px;
    }

    .selected-tab {
      background-color: ${theme.selectedTabAndForms};
      color: ${theme.generalText};
    }

    .forms {
      display: none;
      flex-direction: column;
      padding: 20px;
      background-color: ${theme.selectedTabAndForms};
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      border-top-right-radius: 10px;
    }

    .selected-form {
      display: flex;
    }

    .editTracksContainer {
      display: flex;
      align-items: center;
      gap: 3px;
      margin-top: 9px;
    }

    .minutesField, .secondsField {
      max-width: 17px;
    }

    .trackTitle {
      min-width: 300px;
    }

    #frontCover {
      max-width: 150px;
    }

    .trackIndexDiv {
      width: 25px;
      text-align: right;
      margin-right: 3px;
    }

    select {
      padding: 5px 9px;
      border-radius: 5px;
      border: 1px solid #999;
    }

    input::placeholder {
      font-style: italic;
      color: rgb(181, 181, 181);
    }

    .detailsHeader {
      margin-top: 2px;
      margin-bottom: 5px;
    }

    .inputWithSuggestions {
      display: flex;
      flex-direction: row;
      gap: 10px;
      position: relative;
    }

    .suggestions {
      position: absolute;
      left: 270px;
      list-style: none;
      margin: 0;
      padding: 0;
      background: white;
      min-width: 200px;
      max-width: 350px;
    }

    .suggestions li {
      padding: 4px;
      cursor: pointer;
    }

    .suggestions li:hover {
    background-color: ${theme.mainBackground};
    }

    #addTrackBtn, #removeTrackBtn {
      width: 25px;
      height: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      border-radius: 50%;
      font-size: 20px;
    }

    #plusAndMinusBtn {
      margin-top: 10px;
      margin-left: 30px;
      display: flex;
      gap: 15px;
    }

    #plusAndMinusBtn button {
      background-color: ${theme.plusAndMinusBtn};
      color: ${theme.plusAndMinusBtnText};
    }

    #cancel, #submit {
      min-width: 58px;
    }

    #removeTrackConfirmDiv {
      display: none;
      background-color: ${theme.inputAndSelect};
      max-width: 600px;
      padding: 12px;
      border-radius: 10px;
    }

    #removeTrackConfirmDiv button {
      margin-top: 7px;
      margin-right: 7px;
    }

    #validationFailMsg {
      position: absolute;
      top: -30px;
      left: -160px;
      min-width: 200px;
    }

    `
