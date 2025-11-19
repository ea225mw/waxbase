export const htmlTemplate = /*html*/ `
<div id="detailsWrapper">
  <div id="conditionsDiv">
    <h3 class="detailsHeader">Condition</h3>
    <div>
      <label for="mediaConditionId" class="conditionLabel">Media condition</label>
      <select name="mediaConditionId" value="">
        <!-- MEDIA CONDITION CONTENT CREATED DYNAMICALLY -->
      </select>
      <input placeholder="Media condition notes" id="mediaConditionNotes" name="mediaConditionNotes">
    </div>
    <div>
      <label for="sleeveConditionId" class="conditionLabel">Sleeve condition</label>
      <select name="sleeveConditionId" value="">
        <!-- SLEEVE CONDITION CONTENT CREATED DYNAMICALLY -->
      </select>
      <input placeholder="Sleeve condition notes" id="sleeveConditionNotes" name="sleeveConditionNotes">
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
</div>`
