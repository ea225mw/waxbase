import { getTheme, themeID } from '../../config/colorThemes.js'

const theme = getTheme(themeID)

export const cssTemplate =
 
/*css*/`
@import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap');

  #singleRecordWrapper {
    visibility: hidden;
    margin: 0.625rem;
    margin-left: 1.176rem;
    height: 80vh;
  }

  #imgTitleArtist {
    display: grid;
    grid-template: 
  "image titleArtist . editBtn" 3.53rem
  "image titleArtist confirmDelete confirmDelete" 12.94rem
  /16.47rem auto 11.76rem 7.65rem;
  }

  #albumCover {
    grid-area: image;
    max-width: 14.7rem;
    border: solid black 1px;
  }

  #titleArtistHeaders {
    grid-area: titleArtist;
  }

  #buttons {
  grid-area: editBtn;
    display: flex;
    gap: 0.588rem;
  }

  #confirmDeleteDiv {
    grid-area: confirmDelete;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: 19rem;
    height: 10.59rem;
    background-color: ${theme.statisticsParts};
    color: ${theme.generalText};
    border-radius: 0.882rem;
    border: 1px solid black;
    box-shadow: 0.235rem 0.235rem 0.470rem gray;
    margin-top: 0.882rem;
    transform: scaleY(0);
    transform-origin: top;
    transition: 0.35s;
  }

  #confirmDeleteTitle {
    font-weight: 600;
    font-size: 120%;
  }

  #warningSignDiv {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.53rem;
    height: 3.53rem;
  }

  #warningSignDiv img {
    width: 100%;
  }

  #editBtn, #deleteBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 50%;
    background-color: ${theme.buttonsPlates};
    color: white;
    width: 3.235rem;
    height: 3.235rem;
  }

  #editBtn > img {
    width: 2.82rem;
  }
  
  #deleteBtn > img {
    height: 2.06rem;
  }

  #editBtn:hover {
    cursor: pointer;
    background-color: ${theme.evenRows};
  }

  #deleteBtn:hover {
      background-color: red;
  }

  h1,
  h2 {
    margin: 0.59rem;
  }

  table {
    border-collapse: collapse;
  }

  tr td:first-child {
    padding-left: 0.411rem;
    padding-right: 0.294rem;
  }

  tr td:last-child {
    padding-left: 1.176rem;
    padding-right: 0.411rem;  
  }

  td {
    padding-top: 0.235rem;
    padding-bottom: 0.235rem;

  }

  tr:nth-child(even) {
    background-color: ${theme.evenRows};
  }
  
  tr:nth-child(odd) {
    background-color: ${theme.oddRows};
  }

  .dataBox {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.88rem;
    border: 1px solid black;
    box-shadow: 0.235rem 0.235rem 0.411rem gray;
    max-width: fit-content;
    background-color: ${theme.buttonsPlates};
  }

  .scroll-container {
  position: relative;
  overflow-y: auto;
  max-height: 40rem;
}

  #detailsHeader {
    font-size: 1.2rem;
    margin-top: 1.1rem;
    margin-bottom: 0.25rem;
  }

  .flexbox {
    display: flex;
    gap: 0.294rem;
  }

  #detailsDiv {
    background-color: ${theme.evenRows};
    padding: 0.588rem;
  }

  h4 {
    margin-top: 0.529rem;
    margin-bottom: 0.176rem;
    text-decoration: underline;
    font-style: italic;
    font-weight: 600;
    font-size: 1rem;
  }

  #cancelConfirm, #submitConfirm {
    color: ${theme.greyBtnText};
  }
  `
