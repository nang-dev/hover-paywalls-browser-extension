/*
 * outline.js implements redirecting to outline as a backup method
 */

function outline(url) {
    let redirect = "https://outline.com/" + url;
    chrome.tabs.create({url: redirect, active: true});
}