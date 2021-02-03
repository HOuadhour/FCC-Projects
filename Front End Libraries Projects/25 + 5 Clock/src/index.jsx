/* eslint-disable */
import React from "react";
import ReactDOM from "react-dom";
import Clock from "./Components/Clock";
import "./assets/style.css";

ReactDOM.render(
  <React.StrictMode>
    <div className="container">
      <Clock />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
