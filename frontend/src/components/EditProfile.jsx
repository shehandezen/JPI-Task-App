import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";
import { getUserData, updateUserData } from "../app.service";
import "../css/componentStyles/profile.css";
import { jwtDecode } from "jwt-decode";
import PasswordModal from "./PasswordModal";
import MessageBox from "./MessageBox";
import MiniLoader from "./MiniLoader";
import { toast, ToastContainer, Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { toastConfig } from "../toastConfig";

const EditProfile = () => {
  const floppyDisk = <FontAwesomeIcon icon={faFloppyDisk} />;
  const circleX = <FontAwesomeIcon icon={faXmark} />;
  const [viewModal, setViewModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState([]);
  const [successMessage, setSuccessMessage] = useState([]);

  const imgFile = useRef();

  const [data, setData] = useState({
    UserName: "",
    FirstName: "",
    LastName: "",
    Role: "",
    Email: "",
    PhoneNumber: "",
    Image: null,
    Password: "",
  });

  const fetchUser = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    const user = await jwtDecode(token);
    const response = await getUserData(user._id, token);
    if (response.status == 200) {
      toast.success('The data is fetched!', toastConfig)
      await setData({
        UserName: response.data.data.UserName,
        FirstName: response.data.data.FirstName,
        LastName: response.data.data.LastName,
        Role: response.data.data.Role,
        Email: response.data.data.Email,
        PhoneNumber: response.data.data.PhoneNumber,
        Image: response.data.data.Image,
      });
    } else if (response.status == 500) {
      toast('Backend error!', toastConfig)
    } else {
      toast('Something went wrong!', toastConfig)
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchUser();
    console.log(imgFile.current.files.length);
  }, []);

  useEffect(() => {
    const messageTime = setTimeout(() => {
      setMessage([]);
    }, 3000);
    return () => {
      clearTimeout(messageTime);
    };
  }, [message]);

  useEffect(() => {
    const successMessageTime = setTimeout(() => {
      setSuccessMessage([]);
    }, 3000);
    return () => {
      clearTimeout(successMessageTime);
    };
  }, [successMessage]);

  const handleChange = (value, type) => {
    if (type == "username") {
      setData({ ...data, UserName: value });
    } else if (type == "firstname") {
      setData({ ...data, FirstName: value });
    } else if (type == "lastname") {
      setData({ ...data, LastName: value });
    } else if (type == "role") {
      setData({ ...data, Role: value });
    } else if (type == "email") {
      setData({ ...data, Email: value });
    } else if (type == "phonenumber") {
      setData({ ...data, PhoneNumber: value });
    } else if (type == "image") {
      setData({ ...data, Image: value });
    }
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const validateData = (data) => {
    for (const [key, value] of Object.entries(data)) {
      if (key == "Image") {
        continue;
      }
      if (key == "Password" && value == "") {
        toast.error( "Password is required to continue this process!", toastConfig)
        return false;
      }
      if (value == "" || value == null) {
        toast.error( "Please, give all required feilds!", toastConfig)
       
        return false;
      }
      if (key == "Email") {
        if (!validateEmail(value)) {
        toast.error("Invaild Email Address.", toastConfig)
          return false;
        }
      }
    }
    return 1;
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    if (validateData(data)) {
      const token = localStorage.getItem("token");
      const user = await jwtDecode(token);
      const response = await updateUserData(user._id, token, data);
      if (response.status == "error") {
        // setMessage([...message, "Incorrect password!"]);
        toast.error('Incorrect password!', toastConfig)
      }
      if (response.status == 200) {
        if (!(response.data.token === undefined)) {
          await localStorage.setItem("token", response.data.token);
          toast.success("Profile updated successfully!", toastConfig)
          setTimeout(() => {
            navigate("/dashboard/profile/detail");
          }, 500);
        }
      }else if(response.status == 500){
        toast.error('Backend error!', toastConfig)
      }else{
        toast.error('Something went wrong!', toastConfig)
      }
    }else{
      toast.error('The form is not valid to submit!', toastConfig)
    }
    setIsLoading(false);
  };

  const navigate = useNavigate();

  return (
    <React.Fragment>
      {isLoading ? <MiniLoader /> : ""}
      {viewModal ? (
        <PasswordModal
          setData={setData}
          data={data}
          handleSubmit={handleSubmit}
          setViewModal={setViewModal}
        />
      ) : (
        ""
      )}
      <ToastContainer />

      {/* {message?.map((message, index) => {
        return (
          <MessageBox
            style={{ transform: "translate(50%)" }}
            key={index}
            message={message}
            className="error"
          />
        );
      })} */}
      {successMessage?.map((message, index) => {
        return (
          <MessageBox
            style={{ transform: "translate(50%)" }}
            key={index}
            message={message}
            className="success"
          />
        );
      })}
      <div className="profile-container">
        <div className="side-glass"></div>
        <div className="banner">
          <button
            className="remove-img "
            onClick={() => handleChange(null, "image")}
          >
            {circleX}
          </button>
          <input
            type="file"
            ref={imgFile}
            className="file-box"
            onChange={(e) => {
              handleChange(e.target.files[0], "image");
            }}
          />
          <img
            className="profile-img"
            src={
              data.Image == null ||
                data.Image == undefined ||
                data.Image == "undefined"
                ? "https://www.w3schools.com/howto/img_avatar.png"
                : imgFile.current.files.length == 0
                  ? `${process.env.REACT_APP_API_URL}/profile/${data.Image}`
                  : URL.createObjectURL(data.Image)
            }
            alt="profle image"
            onError={() => {
              setData({ ...data, Image: null })
            }}
          />
          <div className="messages">
            <span className="span-text">
              * Click on the image to upload new image.
            </span>
            <span className="span-text">
              * To remove image, click on the button above.
            </span>
          </div>
        </div>
        <div className="profile-section">
          <div className="section-head">
            Edit Profile
            <span></span>
          </div>
          <div className="details-container">
            <div className="detail-container">
              <div className="detail-text">Username</div>
              <input
                className="detail"
                value={data.UserName}
                onChange={(e) => {
                  handleChange(e.target.value, "username");
                }}
                placeholder="Username"
              />
            </div>
            <div className="detail-container">
              <div className="detail-text">First Name</div>
              <input
                className="detail"
                value={data.FirstName}
                onChange={(e) => {
                  handleChange(e.target.value, "firstname");
                }}
                placeholder="First Name"
              />
            </div>
            <div className="detail-container">
              <div className="detail-text">Last Name</div>
              <input
                className="detail"
                value={data.LastName}
                onChange={(e) => {
                  handleChange(e.target.value, "lastname");
                }}
                placeholder="Last Name"
              />
            </div>
            <div className="detail-container">
              <div className="detail-text">Job Role</div>
              <input
                className="detail"
                value={data.Role}
                onChange={(e) => {
                  handleChange(e.target.value, "role");
                }}
                placeholder="Job Role"
              />
            </div>
            <div className="detail-container">
              <div className="detail-text">Email Address</div>
              <input
                className="detail"
                value={data.Email}
                onChange={(e) => {
                  handleChange(e.target.value, "email");
                }}
                placeholder="Email"
              />
            </div>
            <div className="detail-container">
              <div className="detail-text">Phone Number</div>
              <input
                className="detail"
                value={data.PhoneNumber}
                onChange={(e) => {
                  handleChange(e.target.value, "phonenumber");
                }}
                placeholder="Phone Number"
              />
            </div>

            <div className="detail-button-container">
              <button onClick={(e) => setViewModal(true)}>
                Save {floppyDisk}
              </button>

              <button
                style={{ background: "var(--red)" }}
                onClick={() => {
                  navigate(-1);
                }}
              >
                {" "}
                {circleX} Discard
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EditProfile;
