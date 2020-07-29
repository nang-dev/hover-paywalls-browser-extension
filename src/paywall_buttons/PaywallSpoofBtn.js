/*
 * PaywallSpoofBtn.js renders the button to add/remove sites from
 * the paywall cookie list
 */

/*global chrome*/

import React, { Component } from "react";
import Button from 'react-bootstrap/Button';


class PaywallSpoofBtn extends Component {
  constructor(props) {
    super(props);
    this.removeFromSpoofWhitelist = this.removeFromSpoofWhitelist.bind(this);
    this.addToSpoofWhitelist = this.addToSpoofWhitelist.bind(this);
    this.state = {
      inSpoofWhitelist: chrome.extension.getBackgroundPage().paywallInSpoofWhitelist
    };
  }

  addToSpoofWhitelist = () => {
    let bg = chrome.extension.getBackgroundPage();
    bg.getCurrentTabRoot(bg.addToPaywallSpoofWhitelist);
    bg.paywallInSpoofWhitelist = true;
    this.setState(() => ({
      inSpoofWhitelist: true
    }))
    this.props.rerenderParentCallback();
  }

  removeFromSpoofWhitelist = () => {
    let bg = chrome.extension.getBackgroundPage();
    bg.getCurrentTabRoot(bg.removeFromPaywallSpoofWhitelist);
    bg.paywallInSpoofWhitelist = false;
    this.setState((ps) => ({
      inSpoofWhitelist: false
    }))
    this.props.rerenderParentCallback();
  }

  render() {
    let listBtn;
    let bg = chrome.extension.getBackgroundPage();
    if(bg.paywallEnabled) {
      if(this.state.inSpoofWhitelist)
        listBtn = <Button onClick={this.removeFromSpoofWhitelist} variant="warning" style={{fontSize:"15px"}}>Spoof Site for Paywall</Button>
      else
        listBtn = <Button onClick={this.addToSpoofWhitelist} variant="outline-info" style={{fontSize:"15px"}}>Unspoof Site for Paywall</Button>
    }
    else {
      listBtn = <Button onClick={this.addToSpoofWhitelist} variant="outline-info" style={{fontSize:"15px"}} disabled>Paywall Bypass Disabled</Button>
    }
    return (<div>
      {listBtn}
      </div>
    );
  }
}
export default PaywallSpoofBtn;