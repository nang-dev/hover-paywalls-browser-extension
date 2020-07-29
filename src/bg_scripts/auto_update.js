/*
 * auto_udate.js contains all the functionality for updating extension when possible
 */

function handleUpdateAvailable(details) {
    console.log("Update Available: " + details.version);
    // Proceed to upgrade the add-on
    chrome.runtime.reload();
  }
  
chrome.runtime.onUpdateAvailable.addListener(handleUpdateAvailable);