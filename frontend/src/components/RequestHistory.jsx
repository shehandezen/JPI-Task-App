import React from "react";
import { Outlet } from "react-router-dom";
import "../css/componentStyles/development.css";

const RequestHistory = () => {
  return (
    <>
      <div className="dev-container">
      <img src="../../../development.svg" alt="developmet" />
        <div className="text">This Feature is under development.</div>
      </div>
      <Outlet />
    </>
  );
};

export default RequestHistory;
