import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faKey,
  faEye,
  faArrowRightToBracket,
  faAddressCard,
} from "@fortawesome/free-solid-svg-icons";
import { MessageBox, MiniLoader } from "../components";
import "../css/form.css";
import { signUpFunc } from "../app.service";
import Animate from "../Animate";

const SignUp = () => {
  const [isActive, setIsActive] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const messageTime = setTimeout(() => {
      setMessages([]);
    }, 2000);
    return () => {
      clearTimeout(messageTime);
    };

    // clearInterval();
  }, [messages]);

  const [data, setData] = useState({
    UserName: "",
    Role: "",
    Email: "",
    Password: "",
  });

  const user = <FontAwesomeIcon icon={faUser} />;
  const key = <FontAwesomeIcon icon={faKey} />;
  const eye = <FontAwesomeIcon icon={faEye} />;
  const arrowRight = <FontAwesomeIcon icon={faArrowRightToBracket} />;
  const envelope = <FontAwesomeIcon icon={faEnvelope} />;
  const addressCard = <FontAwesomeIcon icon={faAddressCard} />;

  const handleInput = (e, type) => {
    if (type == "username") {
      setData({ ...data, UserName: e.target.value });
    } else if (type == "email") {
      setData({ ...data, Email: e.target.value });
    } else if (type == "password") {
      setData({ ...data, Password: e.target.value });
    } else if (type == "role") {
      setData({ ...data, Role: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    let response = await signUpFunc(data);
    console.log(response);
    setMessages([...messages, response]);
    setIsLoading(false);
    if (response?.status == "success") {
      setTimeout(() => {
        navigate("/signin");
      }, 500);
    }
  };

  return (
    <React.Fragment>
      {/* <MessageBox message="Good luck!" className="error" /> */}
      {/* {status == 201 ? (
        <MessageBox message="Sign up successful!" className="success" />
      ) : (
        ""
      )} */}
      {messages?.map((ele, index) => {
        return (
          <MessageBox
            key={index}
            message={ele.message}
            className={ele.status}
          />
        );
      })}
      {isLoading ? <MiniLoader /> : ""}{" "}
      <Animate>
        <div className="form-container">
          <div className="form-box">
            <div className="form-head">Sign Up</div>
            <div className="input-container">
              <div className="input-icon">{user}</div>
              <input
                type="text"
                id="username"
                placeholder="Username"
                onChange={(e) => handleInput(e, "username")}
              />
            </div>
            <div className="input-container">
              <div className="input-icon">{addressCard}</div>
              <input
                type="text"
                id="role"
                placeholder="Role"
                onChange={(e) => handleInput(e, "role")}
              />
            </div>
            <div className="input-container">
              <div className="input-icon">{envelope}</div>
              <input
                type="email"
                id="email"
                placeholder="email"
                onChange={(e) => handleInput(e, "email")}
              />
            </div>
            <div className="input-container">
              <div className="input-icon">{key}</div>
              <input
                type={isActive ? "text" : "password"}
                id="password"
                placeholder="Password"
                onChange={(e) => handleInput(e, "password")}
              />
              <span
                className="view-password"
                onMouseUp={() => {
                  setIsActive(false);
                }}
                onMouseDown={() => {
                  setIsActive(true);
                }}
                onTouchEnd={() => {
                  setIsActive(false);
                }}
                onTouchStart={() => {
                  setIsActive(true);
                }}
              >
                {eye}
              </span>
            </div>
            <div className="input-container">
              <button
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Sign Up {arrowRight}
              </button>
            </div>
            <div className="input-container" id="bottom-text">
              <p>
                Are you already have account?
                <Link to="/signin"> click here.</Link>
              </p>
            </div>
          </div>
          <div className="description-box">
            <div className="logo">
              <svg
                className="logo"
                viewBox="0 0 500 500"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <style
                    fonts="ADLaM Display"
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
                    className="signin-svg-line"
                    style={{ stroke: "#10202b", strokeWidth: 8, fill: "none" }}
                    cx="249.067"
                    cy="250.933"
                    rx="207.4"
                    ry="140.237"
                  />
                  <text
                    className="signin-svg-line"
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
            <div className="description">
              Are you already signed up? click the button below.
            </div>
            <Link to="/signin">Sign In</Link>
          </div>
        </div>
      </Animate>
    </React.Fragment>
  );
};

export default SignUp;
