/*
 * paywall_SM.js contains all the functionality for the paywall blacklist for changing 
 * referer to be from Social Media site
 */

var paywallInSMWhitelist = true;

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