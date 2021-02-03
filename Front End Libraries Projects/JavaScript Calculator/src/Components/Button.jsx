/* eslint-disable */
import React, { Component } from "react";
import "../assets/style.css";

class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.id === "equals") {
      return (
        <div
          key={this.props.id}
          id={this.props.id}
          className="button"
          style={{
            gridArea: this.props.id,
          }}
          onClick={this.props.handleClick}>
          <p>{this.props.value}</p>
        </div>
      );
    } else if (this.props.id === "clear") {
      return (
        <div
          id={this.props.id}
          className="button"
          style={{
            gridArea: this.props.id,
          }}
          onClick={this.props.handleClick}>
          <p>{this.props.value}</p>
        </div>
      );
    } else {
      return (
        <div
          key={this.props.id}
          id={this.props.id}
          className="button"
          style={{ gridArea: this.props.id }}
          onClick={this.props.handleClick}>
          <p>{this.props.value}</p>
        </div>
      );
    }
  }
}

export default Button;
