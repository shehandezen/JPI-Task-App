import React from "react";
import { Outlet } from "react-router-dom";
import "../css/componentStyles/development.css";

const CurrentMouldChange = () => {
  return (
    <>
      <div className="dev-container">
        <img
          src="https://x2yfn4-3000.csb.app/development.webp"
          alt="developmet"
        />
        <div className="text">This Feature is under development.</div>
      </div>
      <Outlet />
    </>
  );
};

export default CurrentMouldChange;
