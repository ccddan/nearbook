import "regenerator-runtime/runtime";

import React, { useEffect, useState } from "react";

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
  }, []);

  return (
    <>
      <button
        className="link"
        style={{ float: "right" }}
        onClick={() => {
          logout();
          navigate("/");
        }}
      >
        Sign out
      </button>
      <main>
        <h1>
          <label
            htmlFor="greeting"
            style={{
              color: "var(--secondary)",
              borderBottom: "2px solid var(--secondary)",
            }}
          >
            {greeting}
          </label>{" "}
          {window.accountId}!
        </h1>
        <form
          onSubmit={async (event: any) => {
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
          }}
        >
          <fieldset id="fieldset">
            <label
              htmlFor="greeting"
              style={{
                display: "block",
                color: "var(--gray)",
                marginBottom: "0.5em",
              }}
            >
              Change greeting
            </label>
            <div style={{ display: "flex" }}>
              <input
                autoComplete="off"
                defaultValue={greeting}
                id="greeting"
                onChange={(e) => setButtonDisabled(e.target.value === greeting)}
                style={{ flex: 1 }}
              />
              <button
                disabled={buttonDisabled}
                style={{ borderRadius: "0 5px 5px 0" }}
              >
                Save
              </button>
            </div>
          </fieldset>
        </form>
        <div style={{ height: "350xp", minHeight: "350px" }}></div>
        <hr />
        <p style={{ textAlign: "center" }}>
          Powered by{" "}
          <a target="_blank" rel="noreferrer" href="https://near.org">
            NEAR Blockchain
          </a>
        </p>
      </main>
      {showNotification && <Notification />}
    </>
  );
}

export default Home;
