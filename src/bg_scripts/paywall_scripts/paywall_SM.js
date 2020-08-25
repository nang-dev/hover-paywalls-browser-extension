/*
 * paywall_spoof.js contains all the functionality for the paywall blacklist for spoofing as google crawler
 */

var paywallInSMWhitelist = true;

function checkPaywallSMWhitelist(details) {
  root = extractRootWebsite(details.url)
  rootSearch = "*://*." + root + "/*"
  if(root !== "failed")
    paywallInSMWhitelist =  (rootSearch in paywallSMWhitelistDict)
}

chrome.webRequest.onCompleted.addListener(checkPaywallSMWhitelist, 
{
  urls: ["<all_urls>"],
  types: ["main_frame"],
})

//Set the storage to default site blacklist on install
function setDefaultPaywallSMWhitelist(details) {
  if (details.reason === 'install') {
    chrome.storage.sync.set({
      paywallSMWhitelistDict: paywallSMWhitelistDict
    })
  }
}
chrome.runtime.onInstalled.addListener(setDefaultPaywallSMWhitelist);

function addToPaywallSMWhitelist(root) {
  chrome.storage.sync.get(["paywallSMWhitelistDict"],
  (result) => {
    updResult = result.paywallSMWhitelistDict
    root = "*://*." + root + "/*"

    //Add root to paywallSMWhitelistDict
    updResult[root] = '1' 

    chrome.storage.sync.set({
        paywallSMWhitelistDict: updResult
    }, function() {
        paywallSMWhitelistDict = updResult;
        console.log("Added " + root + " To Paywall SMWhitelist!");
        chrome.tabs.reload();
    });
  });
}

function removeFromPaywallSMWhitelist(root) {
  chrome.storage.sync.get(["paywallSMWhitelistDict"],
  (result) => {
    updResult = result.paywallSMWhitelistDict
    root = "*://*." + root + "/*"

    //Remove root from paywallSMWhitelistDict
    delete updResult[root]; 

    chrome.storage.sync.set({
      paywallSMWhitelistDict: updResult
      }, function() {
        paywallSMWhitelistDict = updResult;
        console.log("Removed " + root + " From Paywall SMWhitelist!");
        chrome.tabs.reload();
      });
  });
}