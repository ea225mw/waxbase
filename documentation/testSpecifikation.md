
# Test Specification WaxBase

Testing will primarily be carried out through manual testing within **Development testing**:

- Unit tests
- Component tests
- System tests

To test end-points in back-end I will create tests in Postman and save them there. This way it's easy to perform the tests over and over again.

When the application has come so far that a user can test it I will do user tests as well.

If there is time I would like to test a few automated unit tests with Jest just to get some experience from the tool.

## Test Plan

| Task | Estimated time | Real time |
|------|----------------|-----------|
| Create unit tests |  4 h |  |
|  Manual unit testing |  1 h |  |
|  User tests | 2 h  |   |
|  Creates a few automated unit tests | 3 h  |    |

---

## Use Cases

#### UC1 - The user wants to view record-specific information (component)

##### Main Scenario

1. The user scrolls through the table of added records.
2. The user clicks on a specific record in the table.
3. Correct information about the selected record should now be displayed to the right in the single record view.

#### UC2 - The user wants to edit record-specific information (component)

##### Precondition

The user has selected a record according to UC1.

##### Main Scenario

1. The user clicks the Edit info button in the single record view.
2. A new window opens. The window contains fields for all types of information that exist or may exist related to a single record, such as artist and track names.
3. a. The user chooses to add new information to an empty field.
4. a. The user confirms the changes and the newly added information is saved to the record object in the database.
5. The user now once again sees the view for the recently edited record.

##### Alternative Scenario

3. b. The user chooses to delete information.
4. b. The user clicks OK and the recently deleted information is removed from the record object in the database.

---

## Test Cases

### TC-1 - View information about specific record

Use case: UC1

##### Test steps

* Start the application by visiting https://cscloud7-230.lnu.se/waxbase
* The application is displaying a table of records.
* Click on the record that has an index number of 3.

##### Expected output

The "single record view" to the right in the application should display details about the record just clicked:

* album cover
* album title
* artist
* format
* store
* price
* media condition
* sleeve condition
* release year
* original release year
* tracks (track name and duration)

### TC-2 Open edit record view

##### Pre-conditions

To do the test a specific record should be selected from the records table and be seen in the single record view.

##### Test steps

* Click on the button that looks like a pen (the edit record button) in the top right corner of the single record view

##### Expected output

A new interface should be displayed, with clickable tabs for General, Tracks, Cover and Details. The main window of the application should get darker and not react on mouse clicks.

### TC-3 Back-end response to GET request

##### Test steps

* Use a web browser and go to the adress: https://cscloud7-230.lnu.se/waxbase/records/allalbums (or [http://localhost:8085/records/allalbums](http://localhost:8085/records/allalbums) if test is performed locally.)

##### Expected output

A JSON response should be seen showing record information about all records in the collection.

### TC-4 Edit information

##### Pre-conditions

To do the test a specific record should be selected from the records table and be seen in the single record view.

##### Test steps

* Click on the button that looks like a pen (the edit record button) in the top right corner of the single record view.
* In the edit dialog box that is displayed, change some of the following information on the record:
  - album title
  - format
  - release year
  - original release year 
  - price

##### Expected output

The changed information should now be reflected in the details of the record in single record view as well as in the record table to the left.

### TC-5 Delete a record

##### Pre-conditions

To do the test a specific record should be selected from the records table and be seen in the single record view.

##### Test steps

* Click on the button in the top right corner that looks lika a paper bin.
* A confirmation dialog box should now be seen with options to cancel or confirm the deletion.
* Confirm the deletion.

##### Expected output

The record should now have been removed from the record table and no longer be visible in the single record view.

### TC-6 Check updates of statistics when deleting a record

##### Test steps

* Click on the button ("Show statistics") in the left bottom corner so that the statistics bar is shown.
* Select a record from records table.
* Delete a record as per TC-5.

##### Expected output

The statistics bar should update with a new numbers in "Records in collection" and "Money spent on collection".

### TC-7 Test the commonData route in backend (automatic, performed locally)

##### Test steps

* In the console, make sure you are in the project folder.
* Run the test with 'npm test' in the console

##### Expected output

The _commonData.test.js_ test should pass.