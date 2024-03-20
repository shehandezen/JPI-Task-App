import React from "react";
import "../css/Loader.css";

const Loader = () => {
  return (
    <React.Fragment>
      <div className="loader-canvas">
        <svg
          className="logo"
          viewBox="0 0 500 500"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsbx="https://boxy-svg.com"
        >
          <defs>
            <style
              bxfonts="ADLaM Display"
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
              className="line"
              style={{ stroke: "#12d39e", strokeWidth: 8, fill: "none" }}
              cx="249.067"
              cy="250.933"
              rx="207.4"
              ry="140.237"
            />
            <text
              className="text-svg"
              style={{
                fill: "none",
                fontFamily: '"ADLaM Display"',
                fontSize: 11,
                stroke: "#12d39e",
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
        <div className="loader">
          <div className="bar" />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Loader;
