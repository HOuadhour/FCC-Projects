/* eslint-disable */
import React, { Component } from "react";
import "../assets/style.css";

class DrumPad extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
    document.getElementById(this.props.id).classList.toggle("active");
  }

  handleKeyPress = (event) => {
    if (
      this.props.keyCode === event.keyCode ||
      this.props.keyTrigger === event.target.innerText
    ) {
      const clip = document.getElementById(this.props.keyTrigger);
      clip.currentTime = 0;
      clip.play();
      document.getElementById("display").innerText = this.props.id.replaceAll(
        "-",
        " "
      );
      this.toggleActive();
      setTimeout(this.toggleActive, 200);
    }
  };

  toggleActive = () => {
    document.getElementById(this.props.id).classList.toggle("active");
  };

  render() {
    return (
      <div
        className="drum-pad"
        id={this.props.id}
        onClick={this.handleKeyPress}
      >
        <p>{this.props.keyTrigger}</p>
        <audio
          src={this.props.url}
          className="clip"
          id={this.props.keyTrigger}
        ></audio>
      </div>
    );
  }
}

export default DrumPad;
