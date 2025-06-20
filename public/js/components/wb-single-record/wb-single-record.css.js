import { getTheme, themeID } from '../../config/colorThemes.js'

const theme = getTheme(themeID)

export const cssTemplate =
// eslint-disable-next-line
/*css*/`
@import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap');

* {
    font-family: 'Gill Sans', 'Gill Sans MT', 'Calibri', 'Trebuchet MS', sans-serif;
  }

  #singleRecordWrapper {
    visibility: hidden;
    margin: 10px;
    margin-left: 20px;
    overflow-y: auto;
    height: 98%;
  }

  #imgTitleArtist {
    display: grid;
    grid-template: 
  "image titleArtist . editBtn" 60px
  "image titleArtist confirmDelete confirmDelete" 220px
  /280px auto 200px 130px;
  }

  #albumCover {
    grid-area: image;
    max-width: 250px;
    border: solid black 1px;
  }

  #titleArtistHeaders {
    grid-area: titleArtist;
  }

  #buttons {
  grid-area: editBtn;
    display: flex;
    gap: 10px;
  }

  #confirmDeleteDiv {
    grid-area: confirmDelete;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: 320px;
    height: 180px;
    background-color: ${theme.statisticsParts};
    color: ${theme.generalText};
    border-radius: 15px;
    border: 1px solid black;
    box-shadow: 4px 4px 8px gray;
    margin-top: 15px;
    transform: scaleY(0);
    transform-origin: top;
    transition: 0.35s;
  }

  #confirmDeleteTitle {
    font-weight: 600;
    font-size: 120%;
  }

  #warningSign {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    background-color: red;
    color: white;
    font-family: "Nunito", sans-serif;
    font-size: 50px;
    font-weight: 600;
    border-radius: 50%;
  }

  #editBtn, #deleteBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 50%;
    background-color: ${theme.buttonsPlates};
    color: white;
    width: 55px;
    height: 55px;
  }

  #editBtn > img {
    width: 48px;
  }
  
  #deleteBtn > img {
    height: 35px;
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
    margin: 10px;
  }

  table {
    border-collapse: collapse;
  }

  tr td:first-child {
    padding-left: 7px;
    padding-right: 5px;
  }

  tr td:last-child {
    padding-left: 20px;
    padding-right: 7px;  
  }

  td {
    padding-top: 4px;
    padding-bottom: 4px;

  }

  tr:nth-child(even) {
    background-color: ${theme.evenRows};
  }
  
  tr:nth-child(odd) {
    background-color: ${theme.oddRows};
  }

  .dataBox {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
    border: 1px solid black;
    box-shadow: 4px 4px 7px gray;
    max-width: fit-content;
    background-color: ${theme.buttonsPlates};
  }

  #detailsHeader {
    font-size: 1.2rem;
    margin-top: 1.1rem;
    margin-bottom: 0.25rem;
  }

  .flexbox {
    display: flex;
    gap: 5px;
  }

  #detailsDiv {
    background-color: ${theme.evenRows};
    padding: 10px;
  }

  h4 {
    margin-top: 9px;
    margin-bottom: 3px;
    text-decoration: underline;
    font-style: italic;
    font-weight: 600;
    font-size: 1rem;
  }

  #cancelConfirm, #submitConfirm {
    color: ${theme.greyBtnText};
  }
  `
