# CSV Dropout Remover
A small program to assist in removal of rows from a .csv file, where the value of chosen parameter (e.g. finometer HR) is an outlier compared to the surrounding data sets. **The program does not send any of your data to any servers: everything runs securely on your own web browser/computer.**

This tool was created for our finometer HR data that would report inaccurate data for a reading when auto-calibrating every dozen reading; this data needs to be removed. This was a quickly made project authored by Adam Mesa for Krassioukov Lab located at The University of British Columbia in BC, Canada.

Technologies used: React & JS (see below), Nivo ([@Nivo/line](https://nivo.rocks/line)), & Bulma.io (styling)


---
## Versions

**1.0.1 (June 15, 2020): Usability improvements**
- graph now uses more screen space (if available)
- is now "installable" to desktop for convenience

**1.0 (March 3, 2020): Initial release**
- dropouts (and their entire row are removed)


---
_Developer stuff below (which can be ignored)_

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn deploy`

Uses github pages add-on to deploy the app to GH pages.