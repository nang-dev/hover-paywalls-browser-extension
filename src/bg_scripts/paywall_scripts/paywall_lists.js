/*
 * paywall_lists.js contains functionality for initiating and updating List variables
 */

//Set the storage to default site blacklist on install
function setDefaultPaywallLists(details) {
  if (details.reason === 'install') {
      chrome.storage.sync.set({
        paywallSMWhitelistDict: paywallSMWhitelistDict,
        paywallSpoofWhitelistDict: paywallSpoofWhitelistDict,
        paywallBlacklistDict: paywallBlacklistDict,
        paywallCookieWhitelistDict: paywallCookieWhitelistDict
      })
  }
}
chrome.runtime.onInstalled.addListener(setDefaultPaywallLists);

function checkPaywallLists(root) {
  rootSearch = "*://*." + root + "/*"
  if(root !== "failed") {
    paywallInSMWhitelist =  (rootSearch in paywallSMWhitelistDict)
    paywallInSpoofWhitelist =  (rootSearch in paywallSpoofWhitelistDict)
    paywallInBlacklist = (rootSearch in paywallBlacklistDict)
    paywallEnabled =  (rootSearch in paywallBlacklistDict)
    paywallInCookieWhitelist = (rootSearch in paywallCookieWhitelistDict)
    console.log("paywallEnabled: " + paywallEnabled)
  }
}

function updatePaywallLists(details) {
  getCurrentTabRoot(checkPaywallLists)
}
chrome.webRequest.onCompleted.addListener(updatePaywallLists, {
  urls: ["<all_urls>"],
  types: ["main_frame"],
})
