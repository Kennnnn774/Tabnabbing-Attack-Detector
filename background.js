let screenshotInterval = 10000; // Interval for taking screenshots (e.g., 10000 ms = 10 seconds)
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

function checkTabNabbing(activeInfo) {
    currInfo = activeInfo; // Update the info
    if (activeInfo.tabId in screenshots) {
      console.log("old tab. Comparing...");
      
      let prevScreenshots = screenshots[activeInfo.tabId];
  
      chrome.tabs.captureVisibleTab({format : "png"}, function(image){
        if(chrome.runtime.lastError) {
            return;
        }
  
        chrome.tabs.sendMessage( activeInfo.tabId, {prevData: prevScreenshots, newData: image}, 
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
