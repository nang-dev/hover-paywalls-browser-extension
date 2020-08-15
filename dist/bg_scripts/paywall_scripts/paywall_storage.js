/*
 * paywall_storage.js contains all the functionality for the paywall blacklist
 */

var paywallInBlacklist = false;

function checkPaywallBlackList(root) {
  rootSearch = "*://*." + root + "/*"
  if(root !== "failed") {
    paywallInBlacklist = (rootSearch in paywallBlacklistDict)
    paywallEnabled =  (rootSearch in paywallBlacklistDict)
    console.log("paywallEnabled: " + paywallEnabled)
  }
}

function updatePaywallBlackList(details) {
  getCurrentTabRoot(checkPaywallBlackList)
}

chrome.webRequest.onCompleted.addListener(updatePaywallBlackList, 
{
  urls: ["<all_urls>"],
  types: ["main_frame"],
})

//Set the storage to default site blacklist on install
function setDefaultPaywallBlacklist(details) {
  if (details.reason === 'install') {
    chrome.storage.sync.set({
      paywallBlacklistDict: paywallBlacklistDict
    })
  }
}
chrome.runtime.onInstalled.addListener(setDefaultPaywallBlacklist);

function addToPaywallBlacklist(root) {
  chrome.storage.sync.get(["paywallBlacklistDict"],
  (result) => {
    updResult = result.paywallBlacklistDict
    root = "*://*." + root + "/*"

    //Add root to paywallBlacklistDict
    updResult[root] = '1' 

    chrome.storage.sync.set({
        paywallBlacklistDict: updResult
    }, function() {
        paywallBlacklistDict = updResult;
        console.log("Added " + root + " To Paywall Blacklist!");
        chrome.tabs.reload();
    });
  });
}

function removeFromPaywallBlacklist(root)  {
  chrome.storage.sync.get(["paywallBlacklistDict"],
  (result) => {
    updResult = result.paywallBlacklistDict
    root = "*://*." + root + "/*"

    console.log("Deleting " + root + "from Paywall Blacklist")
    //Remove root from paywallBlacklistDict
    delete updResult[root]; 

    chrome.storage.sync.set({
      paywallBlacklistDict: updResult
      }, function() {
        paywallBlacklistDict = updResult;
        console.log("Removed " + root + " From Paywall Blacklist!");
        chrome.tabs.reload();
      });
  });
}