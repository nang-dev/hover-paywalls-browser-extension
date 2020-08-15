/*
 * paywall_bypass.js contains all the functionality to bypass paywalls
 * The most efficient and successful way I found to do this was by:
 * 
 * 1. Reroute Referer to Twitter (mimics that we came from Twitter)
 * 2. Spoofing our machine as a Google Crawler by manipulating the HTTP requestHeaders
 *    if on blacklist
 * 3. Block cookies if on blacklist
 */

var paywallEnabled = true

//bypassPaywalls() spoofs our machine as a Google Adbot 
//by manipulating the HTTP requestHeaders
function bypassPaywalls(details) {

  root = extractRootWebsite(details.url)
  rootSearch = "*://*." + root + "/*"

  if(!(rootSearch in paywallBlacklistDict)) {
    paywallEnabled = false;
    //Reenable Cookies
    chrome.contentSettings.cookies.set({
      'primaryPattern': rootSearch,
      'setting': 'allow'
    });
    return;
  }

  paywallEnabled = true;
  //Redirect Referer

  details.requestHeaders = details.requestHeaders.filter(function(header) {
    if(header.name === "Referer")
      return false
    return true
  })
  details.requestHeaders.push({
    "name": "Referer",
    "value": "https://t.co/"
  })
  console.log("Changed Header to Twitter")
  
  //Set Cookie Permission as necessary
  if (!(rootSearch in paywallCookieWhitelistDict)) {
    chrome.contentSettings.cookies.set({
      'primaryPattern': rootSearch,
      'setting': 'block'
    });
    console.log("Blocked Cookies")
  }
  else {
    //Reenable Cookies
    chrome.contentSettings.cookies.set({
      'primaryPattern': rootSearch,
      'setting': 'allow'
    });
    console.log("Enabled Cookies")
  }
  
  if (!(rootSearch in paywallSpoofWhitelistDict)) {
    //Spoof our device as a Google Crawler
    details.requestHeaders = details.requestHeaders.filter(function(header) {
      if(header.name === "User-Agent" || header.name === "X-Forwarded-For") {
        return false
      }
      return true
    })
    var google_adbot_UA = "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Chrome/W.X.Y.Z‡ Safari/537.36"
    details.requestHeaders.push({
      "name": "User-Agent",
      "value": google_adbot_UA
    })
    details.requestHeaders.push({
      "name": "X-Forwarded-For",
      "value": "66.249.66.1"
    })
    console.log("Spoofed as google crawler")
  }
  
  return {requestHeaders: details.requestHeaders};
}

//Add listener to bypassPaywalls if on blacklist
chrome.webRequest.onBeforeSendHeaders.addListener(bypassPaywalls, {
  urls: ["<all_urls>"],
  types: ["main_frame"], }, 
  ["requestHeaders", "blocking", "extraHeaders"]
);

/*
function deleteCookies(root) {
  root = "." + root
  chrome.cookies.getAll({domain: root}, function(cookies) {
    //Help from iamadamdev's bypass-paywalls-chrome
    for(var i=0; i<cookies.length; i++) {
      let ck = cookies[i];
      console.log(ck.name)
      const cookie = {
        url: (ck.secure ? 'https://' : 'http://') + ck.domain + ck.path,
        name: ck.name,
        storeId: ck.storeId
      };
      //chrome.cookies.remove(cookie);
    }
  });
}

//blockCookies() blocks Cookies from the website
function blockCookies(details) {
  if(!paywallEnabled || !paywallInBlacklist)
    return
  root = extractRootWebsite(details.url)

  //Root is in the form: example.com
  rootSearch = "*://*." + root + "/*";
  //RootSearch is in the form:  *://*.example.com/*
  if(rootSearch in paywallBlacklistDict)
    deleteCookies(root)
}

//Add listener to blockCookies if on blacklist
chrome.webRequest.onBeforeSendHeaders.addListener(blockCookies, {
  urls: ["<all_urls>"] 
});
*/
