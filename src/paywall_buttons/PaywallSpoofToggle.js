/*
 * PaywallSpoofToggle.js renders the button to add/remove sites from
 * the paywall cookie list
 */

/*global chrome*/

import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class PaywallSpoofToggle extends Component {
  constructor(props) {
    super(props);
    this.removeFromSpoofWhitelist = this.removeFromSpoofWhitelist.bind(this);
    this.addToSpoofWhitelist = this.addToSpoofWhitelist.bind(this);
    this.state = {
      enabled: chrome.extension.getBackgroundPage().paywallEnabled,
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

  toggleSpoof = (checked) => {
    if(checked)
      this.addToSpoofWhitelist();
    else
      this.removeFromSpoofWhitelist();
  }

  render() {
    let enableToggle;
    let bg = chrome.extension.getBackgroundPage();
    let enabled = (bg.paywallInSpoofWhitelist)
    enableToggle = <BootstrapSwitchButton onChange={this.toggleSpoof} checked={enabled} onlabel={'On '} offlabel={'Off'} width={65} onstyle="info" />

    return (<Container fluid>
              <Row>
                <Col xs={7} >
                  <b>Spoof Site For Paywall: </b><br></br>
                </Col>
                <Col xs={5}>
                  {enableToggle}
                </Col>
              </Row>
            </Container>
    );
  }
}
export default PaywallSpoofToggle;