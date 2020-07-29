/*
 * OutlineBtn.js renders the button to use Outline to bypass paywalls
 */


/*global chrome*/

import React, { Component } from "react";
import Button from 'react-bootstrap/Button';


class OutlineBtn extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  outline = () => {
    let bg_scripts = chrome.extension.getBackgroundPage();
    bg_scripts.getCurrentTab(bg_scripts.outline);
  }

  render() {
    return (<div>
                <Button onClick={this.outline} variant="outline-info" style={{fontSize:"15px"}}>Paywall Still There?</Button>
            </div>
    );
  }
}

export default OutlineBtn;