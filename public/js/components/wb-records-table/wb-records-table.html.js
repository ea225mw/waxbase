export const htmlTemplate = /*html*/ `
<div id="tableWrapper">
  <div class="scroll-container">
    <table id="allRecordsTable">
      <thead>
        <tr>
          <th>Index</th>
          <th>Format</th>
          <th>Album Title</th>
          <th>Artist</th>
          <th class="centered">Release year</th>
          <th>Price</th>
          <th>Store</th>
          <th class="centered">Media condition</th>
          <th class="centered">Sleeve condition</th>
        </tr>
      </thead>
      <tbody>
      <!-- CONTENT CREATED DYNAMICALLY -->
      </tbody>
    </table>
  </div>
</div>
`

export const tableRowTemplate = document.createElement('template')
tableRowTemplate.innerHTML = /*html*/ `
<tr class="recordTableRow" data-id="">
  <td class="id centered"></td>
  <td class="format"></td>
  <td class="albumTitle"></td>
  <td class="fullName"></td>
  <td class="releaseYear centered"></td>
  <td class="price"></td>
  <td class="store"></td>
  <td class="mediaCondition centered"></td>
  <td class="sleeveCondition centered"></td>
</tr>
`
