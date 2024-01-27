import React from "react";
import "../../css/dashboard/sidebar.css";
import { Link, useLocation } from "react-router-dom";
// import Logo from "../../img/logo.svg";

const SideBar = ({ linkList }) => {
  const location = useLocation();
  return (
    <React.Fragment>
      <div className="side-bar">
        <div className="logo">
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
        <div className="nav-links">
          {/* <div className="link active">
            <a href="#"> home</a>
          </div> */}
          {linkList.map((element) => {
            console.log(element);
            return (
              <div
                className={
                  location.pathname == element.link ? "link active" : "link"
                }
              >
                <Link to={element.link}>{element.text}</Link>
              </div>
            );
          })}
        </div>
        <div className="version-text">
          Created By <a href="#"> Shehandezen</a>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SideBar;
