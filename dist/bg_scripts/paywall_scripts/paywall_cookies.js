/*
 * paywall_cookies.js contains all the functionality for the paywall blacklist
 */

var paywallInCookieWhitelist = true;

function checkPaywallCookieWhitelist(details) {
  root = extractRootWebsite(details.url)
  rootSearch = "*://*." + root + "/*"
  if(root !== "failed")
    paywallInCookieWhitelist = (rootSearch in paywallCookieWhitelistDict)
}
chrome.webRequest.onCompleted.addListener(checkPaywallCookieWhitelist, 
{
  urls: ["<all_urls>"],
  types: ["main_frame"],
})

//Set the storage to default site blacklist on install
function setDefaultPaywallCookieWhitelist(details) {
  if (details.reason === 'install') {
    chrome.storage.sync.set({
      paywallCookieWhitelistDict: paywallCookieWhitelistDict
    })
  }
}
chrome.runtime.onInstalled.addListener(setDefaultPaywallCookieWhitelist);

function addToPaywallCookieWhitelist(root) {
  chrome.storage.sync.get(["paywallCookieWhitelistDict"],
  (result) => {
    updResult = result.paywallCookieWhitelistDict
    root = "*://*." + root + "/*"
    //Add root to paywallCookieWhitelistDict
    updResult[root] = '1' 

    chrome.storage.sync.set({
        paywallCookieWhitelistDict: updResult
    }, function() {
        paywallCookieWhitelistDict = updResult;
        console.log("Added " + root + " To Paywall CookieWhitelist!");
        chrome.tabs.reload();
    });
  });
}

function removeFromPaywallCookieWhitelist(root) {
  chrome.storage.sync.get(["paywallCookieWhitelistDict"],
  (result) => {
    updResult = result.paywallCookieWhitelistDict
    root = "*://*." + root + "/*"
    //Remove root from paywallCookieWhitelistDict
    delete updResult[root]; 

    chrome.storage.sync.set({
      paywallCookieWhitelistDict: updResult
      }, function() {
        paywallCookieWhitelistDict = updResult;
        console.log("Removed " + root + " From Paywall CookieWhitelist!");
        chrome.tabs.reload();
      });
  });
}