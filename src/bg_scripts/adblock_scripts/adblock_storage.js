/*
 * adblock_storage.js contains all the functionality for the adblock whitelist
 */

var adblockInWhitelist = false

function checkAdblockWhiteList(root) {
  console.log("Checking if " + root + " is in adblockWhitelist...")
  if(root !== "failed")
    adblockInWhitelist =  (root in adblockWhitelistDict)
}  

function updateAdblockWhiteList(details) {
  getCurrentTabRoot(checkAdblockWhiteList)
}

chrome.webRequest.onCompleted.addListener(updateAdblockWhiteList,
  {urls: ["<all_urls>"],
  types: ["main_frame"],});

//Set the storage to default site whitelist (empty) on install
function setDefaultAdblockWhitelist(details) {
  if (details.reason === 'install') {
    chrome.storage.sync.set({
      adblockWhitelistDict: {}
    })
  }
  adblockWhitelistDict = {}
}

chrome.runtime.onInstalled.addListener(setDefaultAdblockWhitelist);


function addToAdblockWhitelist(root) {
  chrome.storage.sync.get(["adblockWhitelistDict"],
  (result) => {
    updResult = result.adblockWhitelistDict
    console.log("root: " + root);

    //Add root to adblockWhitelistDict
    updResult[root] = '1'

    chrome.storage.sync.set({
       adblockWhitelistDict: updResult
    }, function() {
        adblockWhitelistDict = updResult
        adblockInWhitelist = true
        adblockEnabled = false
        console.log("Added " + root + " To Adblock Whitelist!");
    });
  });
}

function removeFromAdblockWhitelist(root) {
  chrome.storage.sync.get(["adblockWhitelistDict"],
  (result) => {
    updResult = result.adblockWhitelistDict
    console.log("root: " + root);

    //Remove root from adblockWhitelistDict
    delete updResult[root]; 

    chrome.storage.sync.set({
       adblockWhitelistDict: updResult
    }, function() {
        adblockWhitelistDict = updResult
        adblockInWhitelist = false
        adblockEnabled = true
        console.log("Removed " + root + " From Adblock Whitelist!");
    });
  });
}