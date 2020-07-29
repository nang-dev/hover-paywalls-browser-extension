/*
 * ReportBtn.js renders the button to use report bugs
 */


/*global chrome*/

import React, { Component } from "react";
import Button from 'react-bootstrap/Button';


class ReportBtn extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  donate = () => {
    let url = "https://github.com/hover-inc/hover-extension/issues/new"
    chrome.tabs.create({url: url, active: true});
  }

  render() {
    return (<div>
                <Button onClick={this.donate} variant="outline-info">Report Bug</Button>
            </div>
    );
  }
}

export default ReportBtn;