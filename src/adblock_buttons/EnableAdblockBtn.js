/*
 * EnableAdblockBtn.js renders the button to toggle Adblock functionalities on/off
 */

/*global chrome*/

import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

class EnableAdblockBtn extends Component {
  constructor(props) {
    super(props);
    this.addToWhitelist = this.addToWhitelist.bind(this);
    this.removeFromWhitelist = this.removeFromWhitelist.bind(this);
    this.state = {
      enabled: chrome.extension.getBackgroundPage().adblockEnabled,
      inWhitelist: chrome.extension.getBackgroundPage().adblockInWhitelist
    };
  }

  toggleAdblock = (checked) => {
    var background = chrome.extension.getBackgroundPage()
    background.adblockEnabled = checked
    if(checked)
      this.removeFromWhitelist();
    else
      this.addToWhitelist();
    this.setState(() => ({
        enabled: checked
    }))
    chrome.tabs.reload()
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
    let enableBtn;
    let bg = chrome.extension.getBackgroundPage();
    console.log("inWhitelist Adblock: " + bg.adblockInWhitelist)

    enableBtn = <BootstrapSwitchButton onChange={this.toggleAdblock} checked={this.state.enabled} onlabel={'On '} offlabel={'Off'} width={65} onstyle="info" />
    return (
      <Container fluid>
        <Row>
          <Col xs={7} >
          <b>Block Ads: </b><br></br>
          <p style={{fontSize:"14px"}}>(On Site):</p>
          </Col>
          <Col xs={5}>
            { enableBtn } 
          </Col>
        </Row>
      </Container>
    );
  }
}
export default EnableAdblockBtn;