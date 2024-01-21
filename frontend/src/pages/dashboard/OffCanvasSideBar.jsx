import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "../../css/dashboard/offcanvassidebar.css";

const OffCanvasSideBar = ({ isMenuShow, setIsMenuShow, linkList }) => {
  const x = <FontAwesomeIcon icon={faXmark} />;
  const [text, setText] = useState("JPI");
  return (
    <React.Fragment>
      <div className="canvas">
        <button
          className="close"
          onClick={() => {
            setIsMenuShow(false);
          }}
        >
          {x}
        </button>
        <div className="hover-back-text">{text}</div>
        <ul className="link-list">
          {linkList?.map((element) => {
            return (
              <li>
                <Link
                  to={element.link}
                  onMouseOver={(e) => {
                    setText(e.target.text);
                  }}
                  onClick={() => {
                    setIsMenuShow(false);
                  }}
                >
                  {element.text}
                </Link>{" "}
              </li>
            );
          })}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default OffCanvasSideBar;
