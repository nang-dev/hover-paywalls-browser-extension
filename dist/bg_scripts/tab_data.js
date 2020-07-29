/*
 * tab_data.js contains the functionality to get current tab data
 */

extractRootWebsite = (url) => {
  try {
    //Form should be in http[s]://root.com/abcdefg
    if(url.substring(0,4) !== "http")
      return "failed"
    //Make into root.com/abcdefg
    var root = url.split("://")[1]
    //Make into root.com
    root = root.split("/")[0]
    //Delete www. if included
    if(root.includes("www."))
      root = root.substring(4)
    //Ensure root (if it is in form sub.root.com)
    parts = root.split(".")
    if(parts.length < 2)
      return "failed"
    root = parts[parts.length-2] + "." + parts[parts.length-1]
    return root
  }
  catch {
    return "failed"
  }
}
  
function getCurrentTabRoot(callback){
  chrome.tabs.query({active:true, currentWindow:true},function(tabs){
    callback(this.extractRootWebsite(tabs[0].url));
  });
};

function getCurrentTab(callback){
  chrome.tabs.query({active:true, currentWindow:true},function(tabs){
    callback(tabs[0].url);
  });
};


