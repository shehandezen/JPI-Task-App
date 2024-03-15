import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faArrowLeft,
  faArrowRotateRight,
  faHouse,
  faBell,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import "../../css/dashboard/topbar.css";
import Animate from "../../Animate";

const TopBar = ({ isMenuShow, setIsMenuShow, user }) => {
  const arrowLeft = <FontAwesomeIcon icon={faArrowLeft} />;
  const arrowRotateRight = <FontAwesomeIcon icon={faArrowRotateRight} />;
  const house = <FontAwesomeIcon icon={faHouse} />;
  const bell = <FontAwesomeIcon icon={faBell} />;
  const bars = <FontAwesomeIcon icon={faBars} />;

  const [isShow, setIsShow] = useState(false);
  const [username, setUsername] = useState("Username");

  const navigate = useNavigate();

  const logout = async () => {
    await localStorage.clear();
    navigate("/signin");
  };

  useEffect(() => {
    console.log(user?.UserName);
    setUsername(user?.UserName);
  }, [user]);

  return (
    <React.Fragment>
      <div className="top-bar">
        <div className="top-logo">
          <svg
            viewBox="0 0 500 500"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsBx="https://boxy-svg.com"
          >
            <defs>
              <style
                bxFonts="ADLaM Display"
                dangerouslySetInnerHTML={{
                  __html:
                    "@import url(https://fonts.googleapis.com/css2?family=ADLaM+Display%3Aital%2Cwght%400%2C400&display=swap);",
                }}
              />
            </defs>
            <g
              transform="matrix(1.145428, 0, 0, 1.160898, -35.288303, -29.196175)"
              style={{}}
            >
              <ellipse
                className="logo-line"
                style={{ stroke: "#10202b", strokeWidth: 8, fill: "none" }}
                cx="249.067"
                cy="250.933"
                rx="207.4"
                ry="140.237"
              />
              <text
                className="logo-line"
                style={{
                  fill: "none",
                  fontFamily: '"ADLaM Display"',
                  fontSize: 11,
                  stroke: "#10202b",
                  strokeWidth: "0.3px",
                  whiteSpace: "pre",
                }}
                transform="matrix(18.552525, 0, 0, 16.330118, -2426.726074, -3088.772949)"
                x="138.005"
                y="207.803"
              >
                jpi
              </text>
            </g>
          </svg>
        </div>
        <div className="controls">
          <button
            className="menu-btn"
            onClick={() => {
              setIsMenuShow(!isMenuShow);
              console.log("clicked", isMenuShow);
            }}
          >
            {bars}
          </button>
          <button onClick={() => navigate(-1)}>{arrowLeft}</button>
          {/* <button>{arrowRotateRight}</button> */}
          <button onClick={() => navigate("/dashboard")}>{house}</button>
        </div>{" "}
        <div
          className={isShow ? "hover-menu show" : "hide"}
          onBlur={() => setIsShow(false)}
        >
          <div className="name">{username}</div>

          <ul>
            <li>
              <Link to="/dashboard/profile/detail"> View Profile</Link>
            </li>
            <li>
              <Link to="/dashboard/profile/edit">Edit Profile</Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
        <div className="profile">
          <div className="notifications">
            <Link to={'/dashboard/notifications'}>{bell}</Link>
          </div>
          <div
            className="username"
            tabIndex={0}
            onClick={() => setIsShow(!isShow)}
          >
            {username}
          </div>
          <div
            className="profile-image"
            tabIndex={0}
            onClick={() => setIsShow(!isShow)}
          >
            <img
              src={
                user?.Image === undefined || user?.Image === null
                  ? "https://www.w3schools.com/howto/img_avatar.png"
                  : `${process.env.REACT_APP_API_URL}profile/${user?.Image}`
              }
              alt=""
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TopBar;
