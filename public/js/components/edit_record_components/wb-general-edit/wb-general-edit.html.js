export const htmlTemplate = /*html*/ `
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

  <div id="storeComponentWrapper"></div>

  <label for="price">Price</label>
  <input type="text" name="price">
</div>
`
