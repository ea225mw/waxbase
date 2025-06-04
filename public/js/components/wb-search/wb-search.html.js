export const htmlTemplate =
// eslint-disable-next-line
/*html*/`
<div class="backdrop">
  <div id="searchWrapper">
    <div>
      <form action="">
        <h1>Search release</h1>
        <label for="artist">Artist</label>
        <input name="artist">
        <label for="title">Title</label>
        <input name="title">
        <label for="format">Format</label>
        <input name="format">
        <label for="catno">Catalog number</label>
        <input name="catno">
        <div id="buttonsDiv">
          <button type="button" id="cancelSearch">Cancel</button>
          <button type="button" id="searchSubmit"> Search</button>        
        </div>
      </form>
    </div>
    <div id="searchResultDiv">
      <h1>Search results</h1>
    <table id="searchResultTable">

    </table>
    </div>
  </div>
</div>

`
