import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import { initContract } from "./utils";

let window: any = Window;

window.nearInitPromise = initContract()
  .then(() => {
    ReactDOM.render(<App />, document.querySelector("#root"));
  })
  .catch(console.error);
