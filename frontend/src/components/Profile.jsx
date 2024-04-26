import React, { useState, useEffect } from "react";
import { getUserData } from "../app.service";
import "../css/componentStyles/profile.css";
import { jwtDecode } from "jwt-decode";
import MiniLoader from "./MiniLoader";
import { toast, ToastContainer, Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { toastConfig } from "../toastConfig";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState({
    UserName: "",
    FirstName: "",
    LastName: "",
    Role: "",
    Email: "",
    PhoneNumber: "",
    Image: null,
  });

  const fetchUser = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    const user = await jwtDecode(token);
    const response = await getUserData(user._id, token);
    if(response.status == 200){
      await setData({
        UserName: response.data.data.UserName,
        FirstName: response.data.data.FirstName,
        LastName: response.data.data.LastName,
        Role: response.data.data.Role,
        Email: response.data.data.Email,
        PhoneNumber: response.data.data.PhoneNumber,
        Image: response.data.data.Image,
      });
      toast.success('The data is fetched!', toastConfig)
    }else if(response.status == 500){
      toast.error('Backend error!', toastConfig)
    }else{
      toast.error('Something went wrong!', toastConfig)
    }
    
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUser();
    console.log(data);
  }, []);

  return (
    <React.Fragment>
      {isLoading ? <MiniLoader /> : null}
      <ToastContainer />
      <div className="profile-container">
        <div className="side-glass"></div>
        <div className="banner">
          <img
            className="profile-img"
            src={
              data.Image == undefined ||
              data.Image == null ||
              data.Image == "undefined"
                ? "https://www.w3schools.com/howto/img_avatar.png"
                : `${process.env.REACT_APP_API_URL}/profile/${data.Image}`
            }
            alt="profle image"
            onError={()=>{
              setData({...data, Image: null})
            }}
          />
        </div>
        <div className="profile-section">
          <div className="section-head">
            Profile
            <span></span>
          </div>
          <div className="details-container">
            <div className="detail-container">
              <div className="detail-text">Username</div>
              <div className="detail">
                {data.UserName == "" || data.UserName == undefined
                  ? "Username"
                  : data.UserName}
              </div>
            </div>
            <div className="detail-container">
              <div className="detail-text">First Name</div>
              <div className="detail">
                {data.FirstName == "" || data.FirstName == undefined
                  ? "First Name"
                  : data.FirstName}
              </div>
            </div>
            <div className="detail-container">
              <div className="detail-text">Last Name</div>
              <div className="detail">
                {data.LastName == "" || data.LastName == undefined
                  ? "Last Name"
                  : data.LastName}
              </div>
            </div>
            <div className="detail-container">
              <div className="detail-text">Job Role</div>
              <div className="detail">
                {data.Role == "" || data.Role == undefined
                  ? "Job Role"
                  : data.Role}
              </div>
            </div>
            <div className="detail-container">
              <div className="detail-text">Email Address</div>
              <div className="detail">
                {data.Email == "" || data.Email == undefined
                  ? "Email Address"
                  : data.Email}
              </div>
            </div>
            <div className="detail-container">
              <div className="detail-text">Phone Number</div>
              <div className="detail">
                {data.PhoneNumber == "" || data.PhoneNumber == undefined
                  ? "Phone Number"
                  : data.PhoneNumber}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
