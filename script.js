chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (chrome.runtime.lastError) {
    // Handle the error here
    return;
  } else {
    console.log("Comparing and displaying.");
    console.log("message", message);
    oldImage = message.oldImage;
    newImage = message.newImage;
    currId = message.currId;
  
    resemble(newImage).compareTo(oldImage).onComplete(
        function(data) {
          console.log("Mismatch percentage: ", data.misMatchPercentage);
    
          if(data.misMatchPercentage > 1) {
            console.log("There is a mismatch.")
            showMismatch(data.getImageDataUrl());
            chrome.runtime.sendMessage({ misMatchFound: true, tabId: currId });
          } else {
            chrome.runtime.sendMessage({ misMatchFound: false, tabId: currId });
          }  
        }
      );
      return true;
  }
});

function showMismatch(dataUrl) {
  var existingHighlight = document.getElementById('highlight');
  if (existingHighlight) {
    //remove the oldhightlight first
      existingHighlight.remove();
  }

  var highlight = document.createElement('div');
  highlight.id="highlight";
  highlight.style.width = "100%";
  highlight.style.height = "100%";
  highlight.style.top = "0px";
  highlight.style.left = "0px";
  highlight.style.backgroundImage = "url(" + dataUrl + ")";
  highlight.style.backgroundSize = "cover"
  highlight.style.position = "fixed";
  highlight.style.zIndex = "1000";
  highlight.style.backgroundColor = "rgba(0, 255, 0, 0.5)"; 
  
  highlight.onclick = function() {
    // click can remove the highlighted area
    this.remove(); 
};

  document.body.appendChild(highlight);
}
