/*
 * paywall_cookies.js contains all the functionality for the paywall blacklist
 */

var paywallInCookieWhitelist = true;

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