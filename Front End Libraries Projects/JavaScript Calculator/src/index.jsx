import React from "react";
import ReactDOM from "react-dom";
import "./assets/style.css";
import Calculator from "./Components/Calculator";

ReactDOM.render(
  <React.StrictMode>
    <div className="container">
      <Calculator />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
