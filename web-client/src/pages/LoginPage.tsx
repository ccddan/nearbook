import "regenerator-runtime/runtime";

import React from "react";
import { login } from "../utils";

export default function LoginPage() {
  return (
    <main>
      <h1 className="logo-font nearbook-title-login color-secondary">
        NEARBook<span className="principal-font">tesnet</span>
      </h1>
      <p style={{ textAlign: "center", marginTop: "2.5em" }}>
        The unstoppable, censorship resistant and decentralized social media
        platform. As it had to have been since the beginning.
      </p>
      <p style={{ textAlign: "center", marginTop: "2.5em" }}>
        Join the community,{" "}
        <i style={{ color: "var(--secondary)" }}>
          <b>YOUR</b>
        </i>{" "}
        community!
      </p>
      <p style={{ textAlign: "center", marginTop: "2.5em" }}>
        <button onClick={login}>Connect Wallet</button>
      </p>
    </main>
  );
}
