import "./Home.css";
import "regenerator-runtime/runtime";

import React, { useEffect, useState } from "react";

import { Navbar } from "../../components/Navbar";
import { Notification } from "../../components/Notification";
import { logout } from "./../../utils";
import { useNavigate } from "react-router-dom";

let window: any = Window;

export function Home() {
  console.log("Home");
  const navigate = useNavigate();

  const [greeting, setGreeting] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (window.walletConnection.isSignedIn()) {
      window.contract
        .getGreeting({ accountId: window.accountId })
        .then((greetingFromContract: string) => {
          setGreeting(greetingFromContract);
        });
    } else {
      console.log("home: not signed in");
      navigate("/");
    }
  }, [navigate]);

  const onSubmitHandler = async (event: any) => {
    event.preventDefault();

    // get elements from the form using their id attribute
    const { fieldset, greeting } = event.target.elements;

    // hold onto new user-entered value from React's SynthenticEvent for use after `await` call
    const newGreeting = greeting.value;

    // disable the form while the value gets updated on-chain
    fieldset.disabled = true;

    try {
      // make an update call to the smart contract
      await window.contract.setGreeting({
        // pass the value that the user entered in the greeting field
        message: newGreeting,
      });
    } catch (e) {
      alert(
        "Something went wrong! " +
          "Maybe you need to sign out and back in? " +
          "Check your browser console for more info."
      );
      throw e;
    } finally {
      // re-enable the form, whether the call succeeded or failed
      fieldset.disabled = false;
    }

    // update local `greeting` variable to match persisted value
    setGreeting(newGreeting);

    // show Notification
    setShowNotification(true);

    // remove Notification again after css animation completes
    // this allows it to be shown again next time the form is submitted
    setTimeout(() => {
      setShowNotification(false);
    }, 11000);
  };
  const onLogoutHandler = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <Navbar onLogout={onLogoutHandler} />
      <div className="mt-5">
        <main className="m-auto max-w-[25em]">
          <h1>
            Greeting:{" "}
            <label
              htmlFor="greeting"
              className="color-secondary underline cursor-pointer"
            >
              {greeting}
            </label>
          </h1>
          <form className="text-center mt-10" onSubmit={onSubmitHandler}>
            <fieldset id="fieldset">
              <label htmlFor="greeting" className="block color-gray mb-2">
                Change greeting
              </label>
              <div className="flex">
                <input
                  autoComplete="off"
                  defaultValue={greeting}
                  id="greeting"
                  onChange={(e) =>
                    setButtonDisabled(e.target.value == greeting)
                  }
                  className="flex-1"
                />
                <button
                  className="btn btn-secondary btn-submit rounded-r-lg min-w-20 max-w-20 w-20"
                  disabled={buttonDisabled}
                >
                  Save
                </button>
              </div>
            </fieldset>
          </form>
          <div className="h-80"></div>
          <hr />
          <p className="content-center">
            Powered by{" "}
            <a target="_blank" rel="noreferrer" href="https://near.org">
              NEAR Blockchain
            </a>
          </p>
        </main>
        {showNotification && <Notification />}
      </div>
    </>
  );
}

export default Home;
