export const htmlTemplate = /*html*/ `
<label for="artistDisplayName">Artist</label>
<div class="inputWithSuggestions">
  <input type="text" name="artistDisplayName">
  <ul id="artistSuggestions" class="suggestions"></ul>
</div>
<input type="hidden" name="artistId" id="artistIdHidden" value=""></input>`
