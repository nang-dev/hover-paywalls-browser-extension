/*
 * EnablePaywallBtn.js renders the button to toggle Paywall Bypas functionalities on/off
 */


/*global chrome*/

import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

class EnablePaywallBtn extends Component {
  constructor(props) {
    super(props);
    this.removeFromBlacklist = this.removeFromBlacklist.bind(this);
    this.addToBlacklist = this.addToBlacklist.bind(this);
    this.state = {
      enabled: chrome.extension.getBackgroundPage().paywallEnabled,
      inBlacklist: chrome.extension.getBackgroundPage().paywallInBlacklist
    };
  }

  addToBlacklist = () => {
    let bg = chrome.extension.getBackgroundPage();
    bg.getCurrentTabRoot(bg.addToPaywallBlacklist);
    bg.paywallInBlacklist = true;
    bg.paywallEnabled = true;
    this.setState(() => ({
      enabled: true,
      inBlacklist: true
    }))
    this.props.rerenderParentCallback();
    chrome.tabs.reload();
  }

  removeFromBlacklist = () => {
    let bg = chrome.extension.getBackgroundPage();
    bg.getCurrentTabRoot(bg.removeFromPaywallBlacklist);
    bg.paywallInBlacklist = false;
    this.setState((ps) => ({
      enabled: bg.paywallEnabled,
      inBlacklist: false
    }))
    this.props.rerenderParentCallback();
    chrome.tabs.reload();
  }

  togglePaywall = (checked) => {
    var background = chrome.extension.getBackgroundPage() ;
    background.paywallEnabled = checked;
    if(checked)
      this.addToBlacklist();
    else
      this.removeFromBlacklist();
    
    this.setState(() => ({
        enabled: checked,
    }))
  }

  render() {
    let enableBtn;
    let bg = chrome.extension.getBackgroundPage();
    console.log("Paywall Enabled: " + bg.paywallEnabled)
    let enabled = (bg.paywallEnabled)
    enableBtn = <BootstrapSwitchButton onChange={this.togglePaywall} checked={enabled} onlabel={'On '} offlabel={'Off'} width={65} onstyle="info" />

    return (
      <Container fluid>
        <Row>
          <Col xs={7} >
            <b>Bypass Paywalls</b><br></br>
            <p style={{fontSize:"14px"}}>(On Site):</p>
          </Col>
          <Col xs={5}>
            {enableBtn}
          </Col>
        </Row>
      </Container>
    );
  }
}
export default EnablePaywallBtn;