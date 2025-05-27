# wb-records-table

## Description

A web component used in the application WaxBase. It holds the main table containing all records in the collection. I shows index, album title, artist, price, store and conditions.

## Styles

This component uses shadow DOM and its CSS styles are encapsulated and not affected by style rules outside of it. All CSS code are in a separate file.

## Methods

| **Name**              | **Description**                   |
|-----------------------|-----------------------------------|
| **renderTemplates** | Renders the HTML and CSS that are stored in separate files. |
| **connectedCallback** | Called when the component is added to DOM. |
| **getAllRecordsData** | Called in connectedCallback and fetches all records from the database and displays them in the table. |
| **setRecordData** | Sets the data for every record in the database and adds it to the table. |
| **setClassesOnTD** | Sets classes to the the td elements created in method setRecordData.|
| **fillTextInTD** | Fills in the correct text in the td elements. |
| **getSingleRecord** | Fetches the clicked on record from the database and displays it in the single record view. Also highlights the clicked on record in the record table. |
| **updateTableRow**| Updates the record table when information is edited. |
| **removeDeletedRecord** | Removes the table row that holds the deleted record. |
