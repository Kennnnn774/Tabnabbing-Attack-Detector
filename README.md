# Tabnabbing Attack Detector ![Icon](https://imgur.com/XbIiT8D.png)

## Description
Tabnabbing Attack Detector is a Chrome Extension designed to enhance your browsing security by detecting unexpected changes in web pages when you switch between tabs. This tool is particularly useful for identifying "tabnabbing" attacks, where a previously safe and familiar web page is replaced with a malicious one while the tab is not in focus.

## Demo

- Main Popup Page
    - ![Popup page](https://imgur.com/2b4vsMa.png)
- Icon Bar
    - ![Popup page](https://imgur.com/FWHhfAn.png)
- Icon Bar with warning
    - ![Icon Bar with warning](https://imgur.com/WS7yiXY.png)
- Normal webpage
    - ![Normal webpage](https://imgur.com/HAplmoq.png)
- Webpage after detecting the change
    - ![Webpage after detecting the change](https://imgur.com/Ge6Ad2v.png)



## Features
- Regular Screenshots: While a user is browsing a webpage, take screenshots at regular intervals, always keeping the last one. Store the screenshots in storage.
- Tab Change Detection: Detect the change to a new tab and start taking screenshots of the new tab.
- Change Highlighting: When a user returns to the old tab, take a fresh screenshot and compare it with the last one. 
- Alert System: Highlight the changes on the page and provide a color coding in the task bar (the small icon on the right top of the browser) to alert the user of potential changes.

## Installation
- Download the Extension: Clone this repository or download the ZIP file and extract it.
-  Load the Extension in Chrome:
    - Open Google Chrome and navigate to chrome://extensions/.
    - Enable "Developer mode" at the top right corner.
    - Click "Load unpacked" and select the directory of this extension.
- Confirm Installation: After loading, the Tabnabbing Attack Detector icon should appear in your Chrome toolbar.

## Usage
Once installed, the extension runs automatically. Here's how to interact with it:

- View Changes: When a change is detected upon returning to a tab, the page will be overlayed with highlighted areas indicating changes.
- Dismiss Highlight: Click on the highlighted overlay to dismiss and interact with the page as usual.
- Check Alerts: A "!" badge on the extension icon indicates detected changes.