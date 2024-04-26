import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faKey,
  faEye,
  faArrowRightToBracket,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer, Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { toastConfig } from "../toastConfig";
import "../css/form.css";
import { signInFunc } from "../app.service";
import { MessageBox, MiniLoader } from "../components";
import Animate from "../Animate";

const SignIn = () => {
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false)


  const navigate = useNavigate();

  const x = <FontAwesomeIcon icon={faXmark} />;
  const user = <FontAwesomeIcon icon={faUser} />;
  const key = <FontAwesomeIcon icon={faKey} />;
  const eye = <FontAwesomeIcon icon={faEye} />;
  const arrowRight = <FontAwesomeIcon icon={faArrowRightToBracket} />;

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setMessages([]);
    }, 7500);

    // clearInterval();
  }, [messages]);

  const [data, setData] = useState({
    Email: "",
    Password: "",
  });

  const handleInput = (e, type) => {
    if (type == "email") {
      setData({ ...data, Email: e.target.value });
    } else if (type == "password") {
      setData({ ...data, Password: e.target.value });
    }
  };

  const checkEmptyFeilds = async()=>{

    for (const [key, value] of Object.entries(data)) {
      if(value == '' || value == undefined || value == null){
        // await setMessages([...messages, {status: 'error', message: 'Please fill out all required feilds.'}])
        toast.error("Please, fill out all required feilds!", toastConfig);

        return false
      }else{
       continue
      }
      return true
    }
    return true
    
  }

  const handleSubmit = async (e) => {
    setIsLoading(true);
 
    if(await checkEmptyFeilds()){

      let response = await signInFunc(data);
      console.log(response);
      // setMessages([...messages, response]);
      setIsLoading(false);
      if (response?.status == "success") {
        toast.success("You have successfully signed in!", toastConfig);
        await localStorage.setItem("token", response.tokens.accessToken);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }else if (response.status == 409) {
        toast.error("It seems you haven't an account!", toastConfig);

      } else if (response.status == 500) {
        toast.error('Backend Error!', toastConfig);

      }else if (response.status == 400) {
        toast.error('Incorrect password!', toastConfig);

      } else {
        toast.error('Something went wrong', toastConfig);

      }
    }
    setIsLoading(false);
  };

  return (
    <React.Fragment>
      {/* {messages?.map((ele, index) => {
        return (
         (ele?.message != undefined )? ( <MessageBox
            key={index}
            message={ele.message}
            className={ele.status}
          />): ''
        );
      })} */}
      <ToastContainer />

      {isLoading ? <MiniLoader /> : ""}

      <Animate>
        <div className="form-container">
          <div className="form-box">
            <div className="form-head">Sign In</div>
            <div className="input-container">
              <div className="input-icon">{user}</div>
              <input
                type="text"
                id="email"
                placeholder="Email"
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
              {" "}
              <a href="#" className="tiny-text">
                Forgot password?
              </a>
            </div>
            <div className="input-container">
              <button
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Sign In {arrowRight}
              </button>
            </div>
            <div className="input-container" id="bottom-text">
              <p>
                Don't have account? <Link to="/signup"> click here.</Link>
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
              Don't have account? click the button below.
            </div>
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </Animate>
    </React.Fragment>
  );
};

export default SignIn;
