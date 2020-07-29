/*
 * DonateBtn.js renders the button to use Donate to bypass paywalls
 */


/*global chrome*/

import React, { Component } from "react";
import Button from 'react-bootstrap/Button';


class DonateBtn extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  donate = () => {
    let url = "https://www.paypal.me/sponsorhover"
    chrome.tabs.create({url: url, active: true});
  }

  render() {
    return (<div>
                <Button onClick={this.donate} variant="outline-info">Sponsor</Button>
            </div>
    );
  }
}

export default DonateBtn;