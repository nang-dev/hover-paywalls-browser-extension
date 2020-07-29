/*
 * PaywallCookieToggle.js renders the button to add/remove sites from
 * the paywall cookie list
 */

/*global chrome*/

import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class PaywallCookieToggle extends Component {
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

  toggleCookie = (checked) => {
    if(checked)
      this.addToCookieWhitelist();
    else
      this.removeFromCookieWhitelist();
  }

  render() {
    let enableToggle;
    let bg = chrome.extension.getBackgroundPage();
    let enabled = (bg.paywallInCookieWhitelist)
    enableToggle = <BootstrapSwitchButton onChange={this.toggleCookie} checked={enabled} onlabel={'On '} offlabel={'Off'} width={65} onstyle="info" />
    
    return (<Container fluid>
              <Row>
                <Col xs={7} >
                  <b>Disable Cookies For Paywall: </b><br></br>
                </Col>
                <Col xs={5}>
                  {enableToggle}
                </Col>
              </Row>
            </Container>
    );
  }
}
export default PaywallCookieToggle;