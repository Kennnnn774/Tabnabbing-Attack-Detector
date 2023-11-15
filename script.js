chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (chrome.runtime.lastError) {
    // Handle the error here
    return;
  } else {
    console.log("Comparing and displaying.");
    console.log("message", message);
    oldImage = message.prevData;
    newImage = message.newData;
  
    resemble(newImage).compareTo(oldImage).onComplete(
        function(data) {
          console.log("Mismatch percentage: ", data.misMatchPercentage);
    
          if(data.misMatchPercentage > 1) {
            console.log("There is a mismatch.")
            console.log(data.getImageDataUrl());
            showMismatch(data.getImageDataUrl())
            // data.getDiffImage().pack().pipe(fs.createWriteStream( './diff.png'));
          }
  
          sendResponse({status: 'ok'});
        }
      );
      return true;
  }
});

function showMismatch(dataUrl) {
    var highlight = document.createElement('div');
    highlight.id="tabdiff";
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
      this.remove(); // 'this' refers to the result element
  };
  
    document.body.appendChild(highlight);
}


// function showMismatch(dataUrl) {
//     // Example logic - this needs to be adapted based on how data is structured
//     // and how you're able to map changes to specific elements or positions on the page

//     let body = document.body;
//     let overlay = document.createElement('div');
//     overlay.style.position = 'absolute';
//     overlay.style.top = 0;
//     overlay.style.left = 0;
//     overlay.style.width = '100%';
//     overlay.style.height = '100%';
//     overlay.style.zIndex = 9999;
//     overlay.style.pointerEvents = 'none'; // To allow clicks to pass through the overlay

//     body.appendChild(overlay);

//     // Assuming data provides coordinates or a way to identify changed areas
//     data.changedAreas.forEach(area => {
//         let highlight = document.createElement('div');
//         highlight.style.backgroundImage = "url(" + dataUrl + ")";
//         highlight.style.position = 'absolute';
//         highlight.style.left = area.x + 'px';
//         highlight.style.top = area.y + 'px';
//         highlight.style.width = area.width + 'px';
//         highlight.style.height = area.height + 'px';
//         highlight.style.backgroundColor = 'rgba(0, 255, 0, 0.5)'; // Semi-transparent green

//         overlay.appendChild(highlight);
//     });
// }
