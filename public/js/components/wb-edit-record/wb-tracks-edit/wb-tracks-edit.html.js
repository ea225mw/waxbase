export const htmlTemplate =
// eslint-disable-next-line
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
      <button id="removeTrackSubmit">Yes, remove</button>
    </div>
  </div>
`

export const trackRowTemplate =
// eslint-disable-next-line
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
