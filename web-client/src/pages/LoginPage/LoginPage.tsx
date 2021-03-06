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
        navigate("/posts");
        return <></>;
      }
    };

    fn();
  }, [navigate]);

  const checkLoginStatus = () => {
    if (window.walletConnection.isSignedIn()) {
      navigate("/posts");
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
      <main className="m-auto pt-[5%] max-w-[25em]">
        <h1 className="font-logo color-primary mt-0 text-center text-4xl">
          NEARBook
          <span className="font-primary text-[16px] font-bold text-right mr-[22%] -mt-[22px] italic block">
            testnet
          </span>
        </h1>
        <p className="text-center mt-10">
          The unstoppable, censorship resistant and decentralized social media
          platform. As it had to have been since the beginning.
        </p>
        <p className="text-center mt-10">
          Join the community,{" "}
          <i className="color-primary">
            <b>YOUR</b>
          </i>{" "}
          community!
        </p>
        <p className="text-center mt-20">
          <button
            className="btn btn-secondary rounded"
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
