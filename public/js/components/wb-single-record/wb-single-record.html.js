const pathToModule = import.meta.url
const editBtnImagePath = new URL('./images/editbtn.svg', pathToModule)
const deleteBtnImagePath = new URL('./images/deletebtn.png', pathToModule)
const warningSignPath = new URL('./images/warning_sign.png', pathToModule)

export const htmlTemplate =
// eslint-disable-next-line
/*html*/`
<div id="singleRecordWrapper">
    <div id="imgTitleArtist">
      <img src="" alt="album cover" id="albumCover">
      <div id="titleArtistHeaders">
        <h1 id="albumTitle"></h1>
        <h2 id="artist"></h2>
      </div>
      <div id="buttons">
        <button id="editBtn"><img src="${editBtnImagePath}"></button>
        <button id="deleteBtn"><img src="${deleteBtnImagePath}"></button>
      </div>
      <div id="confirmDeleteDiv">
        <div id="warningSignDiv"><img src="${warningSignPath}"></div>
        <div>Are you sure you want to delete this record?</div>
        <div id="confirmDeleteTitle"></div>
        <div>
          <button id="cancelConfirm">No, cancel</button>
          <button id="submitConfirm">Yes, delete</button>
        </div>
      </div>
    </div>

    <div id="detailsHeader">Details</div>
      <div class="dataBox">
        <div id="detailsDiv">
          <div class="flexbox">
            <div>Format:</div>
            <div id="format"></div>
          </div>
          <div class="flexbox">
            <div>Store:</div>
            <div id="store"></div>
          </div>
          <div class="flexbox">
            <div>Price:</div>
            <div id="price"></div>
            <div>SEK</div>
          </div>
          <h4>Conditions</h4>
          <div class="flexbox">
            <div>Media:</div>
            <div id="mediaCondition"></div>
          </div>
          <div class="flexbox">
            <div>Sleeve:</div>
            <div id="sleeveCondition"></div>
          </div>
          <h4>Years</h4>
          <div class="flexbox">
            <div>Release year:</div>
            <div id="releaseYear"></div>
          </div>
          <div class="flexbox">
            <div>Original release year:</div>
            <div id="origReleaseYear"></div>
          </div>
        </div>  
      </div>
    <div id="detailsHeader">Tracks</div>
    <div id="tracksDiv" class="dataBox">
      <div class="scroll-container">
        <table id="tracksTable">
          <!-- TRACKS CREATED DYNAMICALLY HERE -->
        </table>
      </div>
    </div>
  </div>
`
