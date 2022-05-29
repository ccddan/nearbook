import "./Home.css";
import "regenerator-runtime/runtime";

import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { RefreshIcon, ViewGridAddIcon } from "@heroicons/react/solid";
import { getTotalPosts, listPosts } from "../../nearbook";

import { Link } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { Notification } from "../../components/Notification";
import { Post } from "./../../../../contract/assembly/models";
import { PostsList } from "../../components/Posts";
import { logout } from "./../../utils";

let window: any = Window;

export function Home() {
  console.log("Home");
  const navigate = useNavigate();
  const routeParams = useParams();
  console.log("Home params:", routeParams);
  const currentLocation = useLocation();
  console.log("currentLocation:", currentLocation);

  const displayNestedRouteContent = Object.keys(routeParams).length > 0;
  const newPostPage = currentLocation.pathname.includes("posts/new");

  const [posts, setPosts] = useState<any[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);

  const [greeting, setGreeting] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [showNotification, setShowNotification] = useState(false);

  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    if (window.walletConnection.isSignedIn()) {
      getTotalPosts().then((total: number) => setTotalPosts(total));
      listPosts()
        .then((posts: Post[]) => {
          console.log("list of posts:", posts);
          setPosts(posts);
        })
        .finally(() => setLoadingPosts(false));
    } else {
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
      {(!!displayNestedRouteContent || !!newPostPage) && <Outlet />}
      {!displayNestedRouteContent && !newPostPage && (
        <>
          <div className="container m-auto">
            <span className="inline-block w-12 h-1 bg-red-700"></span>

            <h2 className="mt-1 text-2xl font-extrabold tracking-wide lg:text-3xl">
              Posts
            </h2>
            <p>
              Total: <span>{totalPosts}</span>
              <button
                className="btn btn-secondary rounded float-right"
                onClick={() => {
                  console.log("create new post");
                }}
              >
                <Link to="new">
                  <ViewGridAddIcon width={30} height={30} />
                </Link>
              </button>
            </p>
          </div>
          {!!loadingPosts && (
            <p className="container m-auto text-center mt-20 flex items-center justify-center">
              <RefreshIcon
                width={19}
                height={19}
                className="loading-icon mr-1"
              />{" "}
              <span>Loading posts...</span>
            </p>
          )}
          {!loadingPosts && <PostsList posts={posts} />}
        </>
      )}
      {/* <div className="mt-5">
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
          <div>
            <button
              className="btn btn-primary"
              onClick={async () => {
                await createPost("Hello world!!");
                await listPosts();
              }}
            >
              Create New Post
            </button>
          </div>
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
                    setButtonDisabled(e.target.value === greeting)
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
      </div> */}
    </>
  );
}

export default Home;
