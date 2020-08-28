/*
 * adblock.js contains all the functionality to block ads
 * The most efficient and successful way I found to do this was by
 * blocking the requests from any ad domain during the onBeforeRequest phase
 * of the site's lifecycle
 * 
 */

var adblockEnabled = true
var blockedCount = 0

function blockAds(details) {
  console.log("adblockEnabled: " + adblockEnabled + " adblockInWhitelist: " + adblockInWhitelist)
  if (!adblockEnabled || adblockInWhitelist)
    return
  //console.log("I am going to block:", details.url)
  blockedCount += 1
  return {cancel: true}
}

chrome.webRequest.onBeforeRequest.addListener(blockAds,
  {urls: adDomains},
  ["blocking"]
)


