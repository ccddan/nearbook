import "./LoginPage.css";
import "regenerator-runtime/runtime";

import React, { useCallback, useEffect } from "react";

import { login } from "../../utils";
import { useNavigate } from "react-router-dom";

let window: any = Window;

export function LoginPage() {
  console.log("LoginPage");
  const navigate = useNavigate();
  const checkLoginStatusFn = useCallback(() => {
    const fn = () => {
      if (window.walletConnection.isSignedIn()) {
        console.log("login: already signed in");
        navigate("/home");
        return <></>;
      }
    };

    fn();
  }, [navigate]);

  const checkLoginStatus = () => {
    if (window.walletConnection.isSignedIn()) {
      console.log("login: already signed in");
      navigate("/home");
      return <></>;
    }
  };

  useEffect(() => {
    checkLoginStatusFn();
  }, [checkLoginStatusFn]);

  return (
    <>
      <section className="ocean">
        <div className="wave1"></div>
        <div className="wave2"></div>
      </section>
      <main>
        <h1 className="logo-font nearbook-title-login color-secondary">
          NEARBook<span className="principal-font">testnet</span>
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
          <button
            onClick={() => {
              login();
              checkLoginStatus();
            }}
          >
            Connect Wallet
          </button>
        </p>
      </main>
    </>
  );
}

export default LoginPage;
