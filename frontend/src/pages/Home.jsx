import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import "../css/home.css";

import video from "../video/background.mp4";
import Animate from "../Animate";

const Home = () => {
  const videoElement = useRef(null);
  useEffect(() => {
    videoElement.current.play();
  }, []);
  return (
    <React.Fragment>
      <video ref={videoElement} className="background-video" loop muted>
        <source src={video} type="video/mp4" />
      </video>
      <Animate>
        <div className="hero">
          <div className="brand-logo">
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
          <div className="hero-content">
            <div className="head-text">JPI Plastic</div>
            <div className="sub-text">Welcome to JPI Task App</div>
            {localStorage.getItem("token") == null ? (
              <div className="links-container">
                <button>
                  <Link to="/signin">Sign In</Link>
                </button>
                <button>
                  <Link to="/signup">Sign Up</Link>
                </button>
              </div>
            ) : (
              <div className="links-container">
                <button>
                  <Link to="/dashboard">Dashboard</Link>
                </button>
              </div>
            )}
          </div>
        </div>
      </Animate>
    </React.Fragment>
  );
};

export default Home;
