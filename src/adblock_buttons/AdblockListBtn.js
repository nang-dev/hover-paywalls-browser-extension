/*
 * AdblockListBtn.js renders the button to add/remove sites from
 * the adblock whitelist
 */

/*global chrome*/

import React, { Component } from "react";
import Button from 'react-bootstrap/Button';

class AdblockListBtn extends Component {
  constructor(props) {
    super(props);
    this.addToWhitelist = this.addToWhitelist.bind(this);
    this.removeFromWhitelist = this.removeFromWhitelist.bind(this);
    this.state = {
      enabled: chrome.extension.getBackgroundPage().adblockEnabled,
      inWhitelist: chrome.extension.getBackgroundPage().adblockInWhitelist
    };
  }

  addToWhitelist = () => {
    let bg = chrome.extension.getBackgroundPage();
    bg.getCurrentTabRoot(bg.addToAdblockWhitelist);
    bg.adblockEnabled = false
    bg.adblockInWhitelist = true
    this.setState(() => ({
      enabled: false,
      inWhitelist: true
    }))
    this.props.rerenderParentCallback();
    chrome.tabs.reload();
  }

  removeFromWhitelist = () => {
    let bg = chrome.extension.getBackgroundPage();
    bg.getCurrentTabRoot(bg.removeFromAdblockWhitelist);
    bg.adblockEnabled = true
    bg.adblockInWhitelist = false
    this.setState(() => ({
      enabled: true,
      inWhitelist: false
    }))
    this.props.rerenderParentCallback();
    chrome.tabs.reload();
  }

  render() {
    let listBtn
    if(this.state.inWhitelist)
      listBtn = <Button onClick={this.removeFromWhitelist} variant="outline-info" style={{fontSize:"15px"}}>Blacklist Site For Adblock</Button>
    else
      listBtn = <Button onClick={this.addToWhitelist} variant="warning" style={{fontSize:"15px"}}>Whitelist Site For Adblock</Button>
    return (<div>
            {listBtn}
            </div>
    );
  }
}

export default AdblockListBtn;