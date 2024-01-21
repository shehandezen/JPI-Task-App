import React from "react";
import "../css/componentStyles/development.css";

const Summary = () => {
  return (
    <React.Fragment>
      <div className="dev-container">
        <img src="./development.webp" alt="developmet" />
        <div className="text">This Feature is under development.</div>
      </div>
    </React.Fragment>
  );
};

export default Summary;
