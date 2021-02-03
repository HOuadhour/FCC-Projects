/* eslint-disable */
import React, { Component } from "react";
import "../assets/style.css";

class Session extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="timer-wrapper">
        <div className="wrapper">
          <i
            className="fas fa-play-circle"
            id="start_stop"
            onClick={this.props.handleTimer}
          />
          <div className="timer">
            <p id="timer-label">{this.props.label}</p>
            <p id="time-left">{`${String(this.props.minutes).replace(
              /(^[0-9]$)/,
              "0$1"
            )}:${String(this.props.seconds).replace(/(^[0-9]$)/, "0$1")}`}</p>
            <audio
              id="beep"
              src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
            />
          </div>
          <i
            className="fas fa-sync"
            id="reset"
            onClick={this.props.handleReset}
          />
        </div>
      </div>
    );
  }
}

export default Session;
