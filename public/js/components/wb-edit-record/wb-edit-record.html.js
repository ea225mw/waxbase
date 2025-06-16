export const htmlTemplate =
// eslint-disable-next-line
/*html*/`
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

        <label for="artistDisplayName">Artist</label>
        <div class="inputWithSuggestions">
          <input type="text" name="artistDisplayName">
          <ul id="artistSuggestions" class="suggestions"></ul>
        </div>
        <input type="hidden" name="artistId" id="artistIdHidden" value="">

        <label for="formatId">Format</label>
        <select name="formatId" value="">
          <!-- FORMAT OPTIONS CREATED DYNAMICALLY HERE -->
        </select>

        <label for="releaseYear">Release year</label>
        <input type="text" name="releaseYear">

        <label for="origReleaseYear">Original release year</label>
        <input type="text" name="origReleaseYear">

        <label for="store">Store</label>
        <div class="inputWithSuggestions">
          <input type="text" name="store">
          <ul id="storeSuggestions" class="suggestions"></ul>
        </div>
        <input type="hidden" name="storeId" id="storeIdHidden" value="">

        <label for="price">Price</label>
        <input type="text" name="price">
      </div>
    </div>
    <div id="tracks" class="forms">
      <div>
        <div id="tracksWrapper">
          <!-- TRACKS CREATED DYNAMICALLY HERE -->
        </div>
      </div>
      <div id="plusAndMinusBtn">
        <button type="button" id="addTrackBtn">+</button>
        <button type="button" id="removeTrackBtn">-</button>
        <div id="removeTrackConfirmDiv">
          <div id="removeTrackConfirmMsg"></div>
          <button id="removeTrackCancel">No, cancel</button>
          <button id="removeTrackSubmit">Yes, remove</button>
        </div>
      </div>
    </div>
    <div id="cover" class="forms">
      <input type="hidden" name="imgURL" value="">
      <img src="" id="frontCover">
    </div>
    <div id="details" class="forms">
      <div id="detailsWrapper">
        <div id="conditionsDiv">
          <h3 class="detailsHeader">Condition</h3>
          <div>
            <label for="mediaConditionId" class="conditionLabel">Media condition</label>
            <select name="mediaConditionId" value="">
              <!-- MEDIA CONDITION CONTENT CREATED DYNAMICALLY -->
            </select>
            <input placeholder="Media condition notes" id="mediaConditionNotes">
          </div>
          <div>
            <label for="sleeveConditionId" class="conditionLabel">Sleeve condition</label>
            <select name="sleeveConditionId" value="">
              <!-- SLEEVE CONDITION CONTENT CREATED DYNAMICALLY -->
            </select>
            <input placeholder="Sleeve condition notes" id="sleeveConditionNotes">
          </div>
        </div>
        <div>
          <h3 class="detailsHeader">RPM</h3>
          <label for="N_A">N/A</label>
          <input type="radio" id="_N_A" name="rpm" value="N_A">
          <label for="33">33</label>
          <input type="radio" id="_33" name="rpm" value="33">
          <label for="45">45</label>
          <input type="radio" id="_45" name="rpm" value="45">
          <label for="78">78</label>
          <input type="radio" id="_78" name="rpm" value="78">
        </div>
      </div>
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
