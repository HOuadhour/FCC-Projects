/* eslint-disable */
import React, { Component } from "react";
import produce from "immer";
import Buttons from "./Buttons";
import Display from "./Display";
import "../assets/style.css";

function zipFlatter(a, b) {
  return a
    .map((item, index) => {
      return [item, b[index]];
    })
    .flat()
    .filter((item) => item !== undefined);
}

const buttons = [
  {
    id: "zero",
    value: "0",
  },
  {
    id: "one",
    value: "1",
  },
  {
    id: "two",
    value: "2",
  },
  {
    id: "three",
    value: "3",
  },
  {
    id: "four",
    value: "4",
  },
  {
    id: "five",
    value: "5",
  },
  {
    id: "six",
    value: "6",
  },
  {
    id: "seven",
    value: "7",
  },
  {
    id: "eight",
    value: "8",
  },
  {
    id: "nine",
    value: "9",
  },
  {
    id: "clear",
    value: "C",
  },
  {
    id: "add",
    value: "+",
  },
  {
    id: "subtract",
    value: "-",
  },
  {
    id: "multiply",
    value: "*",
  },
  {
    id: "divide",
    value: "/",
  },
  {
    id: "decimal",
    value: ".",
  },
  {
    id: "equals",
    value: "=",
    alternative: "ENTER",
  },
];

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ans: undefined,
      formula: undefined,
      operator: undefined,
      output: "0",
      operators: [],
      values: [],
    };
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  setDisplay = (value) => {
    if (this.state.output.length >= 25) {
      document.querySelector(".display").classList.toggle("display-limit");

      setTimeout(() => {
        document.querySelector(".display").classList.toggle("display-limit");
      }, 150);
      if (value === "C") this.handleClear();
      else if (/[\+\-\*\/]/.test(value)) this.handleOperator(value);
      else if (value === "=" || value === "ENTER") this.handleResult();
    } else {
      if (/[0-9]/.test(value)) this.handleNumbers(value);
      else if (value === ".") this.handleDecimal(value);
      else if (/[\+\-\*\/]/.test(value)) this.handleOperator(value);
      else if (value === "=" || value === "ENTER") this.handleResult();
      else if (value === "C") this.handleClear();
    }
  };

  handleNumbers = (value) => {
    let nextState = produce(this.state, (draftState) => {
      draftState.output = (this.state.output + value)
        .replace(/^0+$/g, "0")
        .replace(/^0([1-9]+$)/g, "$1")
        .replace(/^[\+\-\*\/](.+)/g, "$1");

      if (this.state.operator !== undefined) {
        draftState.operators.push(this.state.operator);
        draftState.operator = undefined;
      }
    });
    this.setState(nextState);
  };

  handleDecimal = (value) => {
    let nextState = produce(this.state, (draftState) => {
      draftState.output = /\./.test(this.state.output)
        ? this.state.output
        : /^[0-9]+$/.test(this.state.output)
        ? this.state.output + value
        : "0.";
    });
    this.setState(nextState);
  };

  handleOperator = (value) => {
    let nextState = produce(this.state, (draftState) => {
      draftState.output = /[0-9]+\.$/.test(this.state.output)
        ? this.state.output + "0"
        : this.state.output;
      if (this.state.operator === undefined) {
        draftState.values.push(draftState.output);
      }
      draftState.operator =
        value !== "-"
          ? value
          : this.state.operator === "-"
          ? "+"
          : this.state.operator === undefined
          ? value
          : this.state.operator.length === 1
          ? this.state.operator + value
          : value;

      draftState.output = value;
    });
    this.setState(nextState);
  };

  handleResult = () => {
    let nextState;
    if (/[0-9]+\.?$/.test(this.state.output)) {
      nextState = produce(this.state, (draftState) => {
        if (/\.$/.test(this.state.output)) {
          draftState.values.push(this.state.output + "0");
          draftState.operators.push(this.state.operator);
        } else {
          draftState.values.push(this.state.output);
        }

        const temp = zipFlatter(draftState.values, draftState.operators).join(
          ""
        );
        console.log(temp);
        draftState.output =
          eval(temp) === Infinity
            ? Infinity
            : String(eval(temp)).match(/^-?[0-9]+\.?([0-9]{1,4})?/)[0];
        draftState.operator = undefined;
        draftState.values = [];
        draftState.operators = [];
        draftState.ans = draftState.output;
        draftState.formula = `${temp}= ${draftState.output}`;
      });
      this.setState(nextState);
    }
  };

  handleClear = () => {
    const nextState = produce(this.state, (draftState) => {
      draftState.formula = undefined;
      draftState.output = "0";
      draftState.operator = undefined;
      draftState.ans = undefined;
      draftState.operators = [];
      draftState.values = [];
    });
    this.setState(nextState);
  };

  getID = (value) => {
    const result = buttons.filter(
      (item) => item.value === value || item.alternative === value
    );
    return result.length > 0 ? result[0].id : undefined;
  };

  handleKeyPress = (event) => {
    const values = buttons.map((item) => item.value);
    values.push("ENTER");
    const value = event.key.toUpperCase();
    const id = this.getID(value);
    if (values.includes(value)) {
      this.setDisplay(value);
    }
  };

  handleClick = (event) => {
    const value = event.target.innerText.toUpperCase();
    const id = this.getID(value);
    this.setDisplay(value);
  };

  render() {
    return (
      <div className="calculator">
        <Display {...this.state} />
        <Buttons buttons={buttons} handleClick={this.handleClick} />
      </div>
    );
  }
}

export default Calculator;
