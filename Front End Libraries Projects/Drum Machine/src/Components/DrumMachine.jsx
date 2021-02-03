/* eslint-disable */

import React, { Component } from "react";
import DrumPad from "./DrumPad";
import "../assets/style.css";

class DrumMachine extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="drum-machine">
        <p id="display"></p>
        <div className="drum-pad-wrapper">
          {this.props.data.map((drumpad) => (
            <DrumPad key={drumpad.id} {...drumpad} />
          ))}
        </div>
      </div>
    );
  }
}

export default DrumMachine;
