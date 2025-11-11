# wb-selected-record

## Description

A web component used in the application WaxBase. It displays information about the selected record from the record table. The information regarding the selected record is everything from the record table plus tracks and track duration. There are also two buttons. One for editing record specific information and one button for deleting the record. Before record gets deleted a confirmation message is shown.

## Styles

This component uses shadow DOM and its CSS styles are encapsulated and not affected by style rules outside of it. All CSS code are in a separate file.

## Methods

| **Name**              | **Description**                   |
|-----------------------|-----------------------------------|
| **connectedCallback** | Called when component is added to DOM. Sets up references and event listeners. |
| **showSingleRecord**  | Sets the record data to be viewed.|
| **createTracks**      | Creates tracks in tracks table. |
| **deleteRecord**      | Contacts the server and deletes the record in the database. Dispatches a custom event to update record table. |

