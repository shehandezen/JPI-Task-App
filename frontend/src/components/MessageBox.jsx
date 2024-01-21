import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faXmark } from "@fortawesome/free-solid-svg-icons";

const MessageBox = ({ message, className }) => {
  // const x = <FontAwesomeIcon icon={faXmark} />;

  return (
    <React.Fragment>
      <div className={`message-box ${className}`}>
        <div className="message">{message}</div>
        {/* <button>{x}</button> */}
      </div>
    </React.Fragment>
  );
};

export default MessageBox;
