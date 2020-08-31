/*
 * PaywallSMBtn.js renders the button to add/remove sites from
 * the paywall social media referrer list
 */

/*global chrome*/

import React, { Component } from "react";
import Button from 'react-bootstrap/Button';


class PaywallSMBtn extends Component {
  constructor(props) {
    super(props);
    this.removeFromSMWhitelist = this.removeFromSMWhitelist.bind(this);
    this.addToSMWhitelist = this.addToSMWhitelist.bind(this);
    this.state = {
      inSMWhitelist: chrome.extension.getBackgroundPage().paywallInSMWhitelist
    };
  }

  addToSMWhitelist = () => {
    let bg = chrome.extension.getBackgroundPage();
    bg.getCurrentTabRoot(bg.addToPaywallSMWhitelist);
    bg.paywallInSMWhitelist = true;
    this.setState(() => ({
      inSMWhitelist: true
    }))
    this.props.rerenderParentCallback();
  }

  removeFromSMWhitelist = () => {
    let bg = chrome.extension.getBackgroundPage();
    bg.getCurrentTabRoot(bg.removeFromPaywallSMWhitelist);
    bg.paywallInSMWhitelist = false;
    this.setState((ps) => ({
      inSMWhitelist: false
    }))
    this.props.rerenderParentCallback();
  }

  render() {
    let listBtn;
    let bg = chrome.extension.getBackgroundPage();
    if(bg.paywallEnabled) {
      if(this.state.inSMWhitelist)
        listBtn = <Button onClick={this.removeFromSMWhitelist} variant="warning" style={{fontSize:"15px"}}>Change Referrer Header</Button>
      else
        listBtn = <Button onClick={this.addToSMWhitelist} variant="outline-info" style={{fontSize:"15px"}}>Unchange Referrer Header</Button>
    }
    else {
      listBtn = <Button onClick={this.addToSMWhitelist} variant="outline-info" style={{fontSize:"15px"}} disabled>Bypass Paywall Disabled On Site</Button>
    }
    return (<div>
      {listBtn}
      </div>
    );
  }
}
export default PaywallSMBtn;