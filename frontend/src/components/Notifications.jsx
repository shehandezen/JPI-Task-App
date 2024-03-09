import React from "react";
import "../css/componentStyles/development.css";

const Notifications = () => {
  return (
    <>
      <div className="dev-container">
      <img src="../../development.svg" alt="developmet" />
        <div className="text">This Feature is under development.</div>
      </div>
    </>
  );
};

export default Notifications;
