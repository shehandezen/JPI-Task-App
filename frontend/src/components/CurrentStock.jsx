import React from "react";
import { Outlet } from "react-router-dom";
import "../css/componentStyles/development.css";
import DevGif from '../img/development.webp'

const CurrentStock = () => {
  return (
    <>
      <div className="dev-container">
        <img
          src={DevGif}
          alt="developmet"
        />
        <div className="text">This Feature is under development.</div>
      </div>
      <Outlet />
    </>
  );
};

export default CurrentStock;
