# editRecordBaseClass, wb-edit-record, wb-new-record

## Description
**editRecordBaseClass** works as a base class for **wb-edit-record** and **wb-new-record** web components. They share the same HTML and CSS as well as common methods and variables. The common private variables are made available for the child classes via getters.

## Styles

This component uses shadow DOM and its CSS styles are encapsulated and not affected by style rules outside of it. All CSS code are in a separate file.

## Common methods

| Name                  | Description                       |
|-----------------------|-----------------------------------|
| **connectedCallback** | Called when component is added to DOM. Sets up references and event listeners. |
| **setCommonRecordData** | Sets collection data that is common for the whole application, like lists of all artists and stores. |
| **renderTemplates**| Renders the HTML and CSS that are stored in separate files. |
| **loadBaseURLClient** | Loads the base URL to use for communication with the backend. |
| **changeFormView** | Displays a new part of the edit form (a new tab). |
| **createFormatOptions** | Creates option elements for all record formats in the database. Also sets the saved record format option. |
| **createConditionOptions** | Creates option elements for all record CONDITIONS in the database. |
| **createAnotherTrack** | Adds another track to the tracklist with empty fields for the user to fill. |
| **listenForArtistInput** | Populates a suggestions list when typing in the artist field. |
| **listenForStoreInput** | Populates a suggestions list when typing in the store field. |
| **prepareTracksForSubmission** | Prepares all tracks into an array before submission to the server. |
| **checkForInvalidFields** |Used in submit() for checking if there are any invalid input fields.|
| **setRedBorders** | Sets red borders to the input fields that doesn't pass validation. |
| **cancel** | Cancels the editing and removes the edit view component. |

## Methods in wb-edit-record
| Name                  | Description                       |
|-----------------------|-----------------------------------|
| **connectedCallback** | Called when component is added to DOM. Sets up references and event listeners. |
| **showEditView** | Displays this edit view component. Called every time the user clicks on a record in the record table. | 
| **populateForm** | Populates the edit form with all the record data. |
| **populateTracks** | Populates the tracks tab with all tracks from the record object. Called from **populateForm** |
| **setRPMs**| Sets the radio button that correspons to the the records saved RPM to "checked". |
| **submit** | Submits the form to web server. Differs from the *submit* method in wb-new-record. |

## Methods in wb-new-record
| Name                  | Description                       |
|-----------------------|-----------------------------------|
| **connectedCallback** | Called when component is added to DOM. Sets up references and event listeners. |
| **newRecord** | Initial set up of the form for the record that's going to be added. |
| **submit** | Submits the form to web server. Differs from the *submit* method in wb-edit-record. |

## Events

| Name                  | Description                       |
|-----------------------|-----------------------------------|
| **albumUpdated** | Dispatched in method *submit* in **wb-edit-record**. Holds the updated record.  |
| **recordAdded** | Dispatched in method *submit* in **wb-new-record**. Holds the newly added album. |