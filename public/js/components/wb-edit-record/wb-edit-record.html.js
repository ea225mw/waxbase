export const htmlTemplate = /*html*/ `
<div class="backdrop"></div>
<div class="modal">
  <form id="albumEditForm">
    <div id="tabsDiv">
      <button type="button" data-tab="general" class="tab selected-tab">General</button>
      <button type="button" data-tab="tracks" class="tab">Tracks</button>
      <button type="button" data-tab="cover" class="tab">Cover</button>
      <button type="button" data-tab="details" class="tab">Details</button>
    </div>
    <div id="general" class="forms selected-form">
      <div id="generalWrapper">
        <label for="albumTitle">Album Title</label>
        <input type="text" name="albumTitle">

        <div id="artistComponentWrapper"></div>

        <label for="formatId">Format</label>
        <select name="formatId" value="">
          <!-- FORMAT OPTIONS CREATED DYNAMICALLY HERE -->
        </select>

        <label for="releaseYear">Release year</label>
        <input type="text" name="releaseYear">

        <label for="origReleaseYear">Original release year</label>
        <input type="text" name="origReleaseYear">

        <wb-store-suggestions></wb-store-suggestions>

        <label for="price">Price</label>
        <input type="text" name="price">
      </div>
    </div>
    <div id="tracks" class="forms">
      <wb-tracks-edit></wb-tracks-edit>
    </div>
    <div id="cover" class="forms">
      <input type="hidden" name="imgURL" value="">
      <img src="" id="frontCover">
    </div>
    <div id="details" class="forms">
       <wb-details-edit></wb-details-edit>
    </div>
    <input type="hidden" name="id" id="recordIndex" value="">
  </form>
  <div id="buttonsDiv">
    <div id="validationFailMsg" style="display: none">Please correct invalid fields marked in red.</div>
    <div>
      <button type="button" id="cancel">Cancel</button>
      <button type="button" form="albumEditForm" id="submit">OK</button>
    </div>
  </div>
</div>`
