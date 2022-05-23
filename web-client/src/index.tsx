import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { initContract } from "./utils";

let window: any = Window;

window.nearInitPromise = initContract()
  .then(() => {
    const root = ReactDOM.createRoot(
      document.getElementById("root") as HTMLElement
    );
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  })
  .catch(console.error);
