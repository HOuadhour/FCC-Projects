/* eslint-disable */
import React, { Component } from "react";
import Button from "./Button";
import "../assets/style.css";

class Buttons extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="buttons">
        {this.props.buttons.map((button, idx) => (
          <Button key={idx} {...button} handleClick={this.props.handleClick} />
        ))}
      </div>
    );
  }
}

export default Buttons;
