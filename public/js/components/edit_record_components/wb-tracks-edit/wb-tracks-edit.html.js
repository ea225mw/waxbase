export const htmlTemplate =
 
/*html*/`
  <div>
    <div id="tracksWrapper">
<!-- TRACKS CREATED DYNAMICALLY HERE -->
    </div>
  </div>
  <div id="plusAndMinusBtn">
    <button type="button" id="addTrackBtn">+</button>
    <div id="removeTrackConfirmDiv">
      <div id="removeTrackConfirmMsg"></div>
      <button id="removeTrackCancel">No, cancel</button>
      <button id="removeTrackSubmit">Yes, delete</button>
    </div>
  </div>
`

export const trackRowTemplate = document.createElement('template')
trackRowTemplate.innerHTML =
 
/*html*/`
  <tr class="editTracksContainer" data-id>
    <td class="trackIndexTD"></td>
    <td>
      <input type="text" class="trackTitle">
    </td>
    <td>
      <input type="text" class="minutesField" data-valid="true">
    </td>
    <td>
      <input type="text" class="secondsField" data-valid="true">
    </td>
    <td class="deleteBtnTD">
      <div>-</div>
    </td>
  </tr>
`
export const tableHeadTemplate = document.createElement('template')
tableHeadTemplate.innerHTML = `
<thead>
  <tr>
    <th></th>
    <th>Title</th>
    <th>Min</th>
    <th>Sec</th>
  </tr>
</thead>
`