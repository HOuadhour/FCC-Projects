/* eslint-disable */
import React, { Component } from "react";
import "../assets/style.css";
import produce from "immer";

class Length extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="length-ui">
        <p id={this.props.label.id} className="length-label">
          {this.props.label.name}
        </p>
        <div className="io-wrapper">
          <div className="io-ui">
            <i
              className="fas fa-arrow-circle-down"
              id={this.props.decrement}
              onClick={this.props.handleDec}
            />
            <p className="length-value" id={this.props.length.id}>
              {this.props.length.value}
            </p>
            <i
              className="fas fa-arrow-circle-up"
              id={this.props.increment}
              onClick={this.props.handleInc}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Length;
