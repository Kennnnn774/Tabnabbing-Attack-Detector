let screenshotInterval = 10000; 
let currInfo = null;
let screenshots = {};

function captureScreenshots(tabId) {
    chrome.tabs.captureVisibleTab({format : "png"}, function(image){
        if(chrome.runtime.lastError) {
            return;
        }
        screenshots[tabId] = image;
    });
    console.log("screenshots", screenshots)
}

function alarmUser(tabId){
    try {
        // Set the badge background color to yellow
        chrome.action.setBadgeBackgroundColor({ color: '#FFFF00' });
        // Set the badge text to "!!!"
        chrome.action.setBadgeText({text: "!", tabId: tabId});
    } catch (error) {
        return;
    }
}

function clearBadge(tabId){
    try {
        chrome.action.setBadgeText({text: "",tabId: tabId});
    } catch (error) {
        return;
    }
}

function checkTabNabbing(activeInfo) {
    currInfo = activeInfo; // Update the info so that we can set interval
    if (activeInfo.tabId in screenshots) {
      console.log("old tab. Comparing...");
      
      let prevScreenshots = screenshots[activeInfo.tabId];
  
      chrome.tabs.captureVisibleTab({format : "png"}, function(image){
        if(chrome.runtime.lastError) {
            return;
        }
  
        chrome.tabs.sendMessage( activeInfo.tabId, {oldImage: prevScreenshots, newImage: image, currId: activeInfo.tabId}, 
            function(response) {
                if (chrome.runtime.lastError) {
                    // Handle the error
                    return;
                }
          });
      });
    } else {
        console.log("new tab. Taking a screen shot.");
        captureScreenshots(activeInfo.tabId);
    }
  }

chrome.tabs.onActivated.addListener(activeInfo => {
    checkTabNabbing(activeInfo);
});

setInterval(() => {
    if (currInfo !== null) {
        checkTabNabbing(currInfo);
    }
}, screenshotInterval);

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log("background message", message)
    // Check if a mismatch was found and update the badge
    if (message.misMatchFound) {
        alarmUser(message.tabId);
    } else {
        clearBadge(message.tabId);
    }
});




