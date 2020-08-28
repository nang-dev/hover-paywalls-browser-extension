/*
 * PaywallCookieBtn.js renders the button to add/remove sites from
 * the paywall cookie list
 */

/*global chrome*/

import React, { Component } from "react";
import Button from 'react-bootstrap/Button';


class PaywallCookieBtn extends Component {
  constructor(props) {
    super(props);
    this.removeFromCookieWhitelist = this.removeFromCookieWhitelist.bind(this);
    this.addToCookieWhitelist = this.addToCookieWhitelist.bind(this);
    this.state = {
      inCookieWhitelist: chrome.extension.getBackgroundPage().paywallInCookieWhitelist
    };
  }

  addToCookieWhitelist = () => {
    let bg = chrome.extension.getBackgroundPage();
    bg.getCurrentTabRoot(bg.addToPaywallCookieWhitelist);
    bg.paywallInCookieWhitelist = true;
    this.setState(() => ({
      inCookieWhitelist: true
    }))
    this.props.rerenderParentCallback();
  }

  removeFromCookieWhitelist = () => {
    let bg = chrome.extension.getBackgroundPage();
    bg.getCurrentTabRoot(bg.removeFromPaywallCookieWhitelist);
    bg.paywallInCookieWhitelist = false;
    this.setState((ps) => ({
      inCookieWhitelist: false
    }))
    this.props.rerenderParentCallback();
  }

  render() {
    let listBtn;
    let bg = chrome.extension.getBackgroundPage();
    if(bg.paywallEnabled) {
      if(this.state.inCookieWhitelist)
        listBtn = <Button onClick={this.removeFromCookieWhitelist} variant="warning" style={{fontSize:"15px"}}>Block Cookies</Button>
      else
        listBtn = <Button onClick={this.addToCookieWhitelist} variant="outline-info" style={{fontSize:"15px"}}>Unblock Cookies</Button>
    }
    else {
      listBtn = <Button variant="outline-info" style={{fontSize:"15px"}} disabled>Hover Disabled On Site</Button>
    }
    return (<div>
      {listBtn}
      </div>
    );
  }
}
export default PaywallCookieBtn;