/* eslint-disable */
import React, { Component } from "react";
import Length from "./Length";
import Session from "./Session";
import "../assets/style.css";
import produce from "immer";

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      break: {
        label: {
          name: "Break Length",
          id: "break-label",
        },
        length: {
          value: 5,
          id: "break-length",
        },
        increment: "break-increment",
        decrement: "break-decrement",
      },
      session: {
        label: {
          name: "Session Length",
          id: "session-label",
        },
        length: {
          value: 25,
          id: "session-length",
        },
        increment: "session-increment",
        decrement: "session-decrement",
      },
      timer: {
        id: undefined,
        label: "Session",
        minutes: 25,
        seconds: 0,
        working: false,
      },
    };
  }

  handleIncrement = (event) => {
    if (!this.state.timer.working) {
      if (event.target.id === "break-increment") {
        const nextState = produce(this.state, (draftState) => {
          draftState.break.length.value =
            draftState.break.length.value < 60
              ? draftState.break.length.value + 1
              : 60;
        });
        this.setState(nextState);
      } else {
        const nextState = produce(this.state, (draftState) => {
          draftState.session.length.value =
            draftState.session.length.value < 60
              ? draftState.session.length.value + 1
              : 60;
          draftState.timer.minutes = draftState.session.length.value;
        });
        this.setState(nextState);
      }
    }
  };

  handleDecrement = (event) => {
    if (!this.state.timer.working) {
      if (event.target.id === "break-decrement") {
        const nextState = produce(this.state, (draftState) => {
          draftState.break.length.value =
            draftState.break.length.value > 1
              ? draftState.break.length.value - 1
              : 1;
        });
        this.setState(nextState);
      } else {
        const nextState = produce(this.state, (draftState) => {
          draftState.session.length.value =
            draftState.session.length.value > 1
              ? draftState.session.length.value - 1
              : 1;
          draftState.timer.minutes = draftState.session.length.value;
        });
        this.setState(nextState);
      }
    }
  };

  handleReset = () => {
    const nextState = produce(this.state, (draftState) => {
      draftState.break.length.value = 5;
      draftState.session.length.value = 25;
      draftState.timer.label = "Session";
      draftState.timer.minutes = 25;
      draftState.timer.seconds = 0;
      draftState.timer.working = false;
      const audio = document.querySelector("#beep");
      audio.pause();
      audio.currentTime = 0;
      clearInterval(draftState.timer.id);
      draftState.timer.id = undefined;
      const button = document.querySelector("#start_stop");
      button.classList.remove("fa-pause-circle");
      button.classList.add("fa-play-circle");
    });
    this.setState(nextState);
  };

  handleCounter = () => {
    const nextState = produce(this.state, (draftState) => {
      if (
        (this.state.timer.seconds === 0 && this.state.timer.minutes >= 1) ||
        this.state.timer.seconds >= 1
      ) {
        if (this.state.timer.seconds === 0) {
          draftState.timer.minutes--;
          draftState.timer.seconds = 59;
        } else {
          draftState.timer.seconds--;
        }
      } else {
        const audio = document.querySelector("#beep");
        audio.currentTime = 0;
        audio.play();

        draftState.timer.minutes =
          draftState.timer.label === "Session"
            ? this.state.break.length.value
            : this.state.session.length.value;
        draftState.timer.seconds = 0;
        draftState.timer.label =
          draftState.timer.label === "Session" ? "Break" : "Session";
      }
    });
    this.setState(nextState);
  };

  handleTimer = () => {
    const button = document.querySelector("#start_stop");
    let nextState;
    if (!this.state.timer.working) {
      button.classList.remove("fa-play-circle");
      button.classList.add("fa-pause-circle");
      nextState = produce(this.state, (draftState) => {
        draftState.timer.working = true;
        draftState.timer.id = setInterval(this.handleCounter, 1000);
      });
    } else {
      button.classList.remove("fa-pause-circle");
      button.classList.add("fa-play-circle");
      nextState = produce(this.state, (draftState) => {
        draftState.timer.working = false;
        draftState.timer.id = undefined;
        clearInterval(this.state.timer.id);
      });
    }
    this.setState(nextState);
  };
  render() {
    return (
      <div className="clock">
        <Length
          {...this.state.break}
          handleInc={this.handleIncrement}
          handleDec={this.handleDecrement}
        />
        <Length
          {...this.state.session}
          handleInc={this.handleIncrement}
          handleDec={this.handleDecrement}
        />
        <Session
          {...this.state.timer}
          handleReset={this.handleReset}
          handleTimer={this.handleTimer}
        />
        <p className="copyright">
          Created by{" "}
          <a
            href="https://www.freecodecamp.org/houadhour"
            target="_blank"
            rel="noopener noreferrer">
            HOuadhour
          </a>{" "}
          for FCC
        </p>
      </div>
    );
  }
}

export default Clock;
