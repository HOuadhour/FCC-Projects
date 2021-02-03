/* eslint-disable */
import React, { Component } from "react";
import "../assets/style.css";

class Display extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="display">
        <p className="formula">{this.props.formula}</p>
        <p id="display" className="output">
          {this.props.output}
        </p>
      </div>
    );
  }
}

export default Display;
