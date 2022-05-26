import "./Navbar.css";

import React from "react";

let window: any = Window;

interface NvabarProps {
  onLogout: () => void;
}

export const Navbar = (props: NvabarProps) => {
  return (
    <div className="row bg-dark p-3 border-b-[1px] border-[#323232]">
      <nav className="relative container m-auto p-1">
        <div className="flex items-center justify-between">
          {/* Title */}
          <div className="pt-2">
            <p className="font-logo color-primary text-lg">NEARBook</p>
          </div>

          {/* Menu */}
          {/* <div className="space-x-6 hidden md:flex">
            <Link to="/home">Home</Link>
            <Link to="/friends">Friends</Link>
            <Link to="/messages">Messages</Link>
          </div> */}

          {/* Logout Button */}
          <div className="space-x-6 hidden md:flex">
            <h1 className="p-0 m-0 pt-[6px]">
              Welcome{" "}
              <label className="color-primary font-bold">
                {window.accountId}
              </label>
            </h1>
            <button
              className="btn btn-primary rounded"
              onClick={props.onLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};
