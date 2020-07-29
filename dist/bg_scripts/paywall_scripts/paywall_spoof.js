/*
 * paywall_spoof.js contains all the functionality for the paywall blacklist for spoofing as google crawler
 */

var paywallInSpoofWhitelist = true;

function checkPaywallSpoofWhitelist(details) {
  root = extractRootWebsite(details.url)
  rootSearch = "*://*." + root + "/*"
  if(root !== "failed")
    paywallInSpoofWhitelist =  (rootSearch in paywallSpoofWhitelistDict)
}

chrome.webRequest.onCompleted.addListener(checkPaywallSpoofWhitelist, 
{
  urls: ["<all_urls>"],
  types: ["main_frame"],
})

//Set the storage to default site blacklist on install
function setDefaultPaywallSpoofWhitelist(details) {
  if (details.reason === 'install') {
    chrome.storage.sync.set({
      paywallSpoofWhitelistDict: paywallSpoofWhitelistDict
    })
  }
}
chrome.runtime.onInstalled.addListener(setDefaultPaywallSpoofWhitelist);

function addToPaywallSpoofWhitelist(root) {
  chrome.storage.sync.get(["paywallSpoofWhitelistDict"],
  (result) => {
    updResult = result.paywallSpoofWhitelistDict
    root = "*://*." + root + "/*"

    //Add root to paywallSpoofWhitelistDict
    updResult[root] = '1' 

    chrome.storage.sync.set({
        paywallSpoofWhitelistDict: updResult
    }, function() {
        paywallSpoofWhitelistDict = updResult;
        console.log("Added " + root + " To Paywall SpoofWhitelist!");
        chrome.tabs.reload();
    });
  });
}

function removeFromPaywallSpoofWhitelist(root) {
  chrome.storage.sync.get(["paywallSpoofWhitelistDict"],
  (result) => {
    updResult = result.paywallSpoofWhitelistDict
    root = "*://*." + root + "/*"

    //Remove root from paywallSpoofWhitelistDict
    delete updResult[root]; 

    chrome.storage.sync.set({
      paywallSpoofWhitelistDict: updResult
      }, function() {
        paywallSpoofWhitelistDict = updResult;
        console.log("Removed " + root + " From Paywall SpoofWhitelist!");
        chrome.tabs.reload();
      });
  });
}