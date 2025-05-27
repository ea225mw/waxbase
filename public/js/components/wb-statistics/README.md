# wb-statistics

## Description

A web component for collecting and displaying statistics about the record collection. It shows number of record in the collection and how much money has been spent on those records. The information is shown and hidden via a button.

## Styles

This component uses shadow DOM and its CSS styles are encapsulated and not affected by style rules outside of it. All CSS code are in a separate file.

## Methods

| **Name**              | **Description**                   |
|-----------------------|-----------------------------------|
| **connectedCallback** | Called when the component is added to DOM.|
| **renderTemplates**   | Renders the HTML and CSS that are stored in separate files. |
| **loadBaseURLClient** | Loads the base URL to use for communication with the backend. |
| **updateStatistics**  | Fetches collection status data from the database and updates the corresponding fields in the web component.|
