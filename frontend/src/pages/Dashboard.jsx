import { useState, useEffect, Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { TopBar, SideBar, Workspace, OffCanvasSideBar } from "./dashboard";
import "../css/dashboard.css";
import { Loader } from "../components";
import { getUserData } from "../app.service";
import Animate from "../Animate";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuShow, setIsMenuShow] = useState(false);
  const [linkList, setLinkList] = useState([]);
  const [user, setUser] = useState();

  const location = useLocation();
  const navigate = useNavigate();

  const checkIsLoggedIn = async () => {
    const token = await localStorage.getItem("token");
    console.log(token);

    if (token == null) {
      navigate("/signin");
    } else {
      const userToken = await jwtDecode(token);
      const response = await getUserData(userToken._id, token);
      if (response.status == "error") {
        navigate("/signin");
      } else {
        await setUser(response.data.data);
      }
    }
  };

  useEffect(() => {
    checkIsLoggedIn();
  }, [localStorage.getItem("token")]);

  const pathDetect = (path) => {
    console.log(path.includes("view"));
    if (path.includes("view")) {
      setLinkList([
        {
          text: "Current Production",
          link: "/dashboard/view/current",
        },
        {
          text: "Production History",
          link: "/dashboard/view/history",
        },
        {
          text: "Add Production",
          link: "/dashboard/view/add",
        },
      ]);
    } else if (path.includes("mouldchange")) {
      setLinkList([
        {
          text: "Current Mould Changes",
          link: "/dashboard/mouldchange/current",
        },
        {
          text: "Mould Change History",
          link: "/dashboard/mouldchange/history",
        },
        {
          text: "Add Mould Change",
          link: "/dashboard/mouldchange/add",
        },
      ]);
    } else if (path.includes("material")) {
      setLinkList([
        {
          text: "Current Stock",
          link: "/dashboard/material/current",
        },
        {
          text: "Material Request",
          link: "/dashboard/material/request",
        },
        {
          text: "Material Request History",
          link: "/dashboard/material/history",
        },
      ]);
    } else if (path.includes("profile")) {
      setLinkList([
        {
          text: "View Profile",
          link: "/dashboard/profile/detail",
        },
        {
          text: "Edit Profile",
          link: "/dashboard/profile/edit",
        },
      ]);
    } else {
      setLinkList([
        {
          text: "Upload Data Sheet",
          link: "/dashboard/upload",
        },
        {
          text: "Production",
          link: "/dashboard/view/current",
        },
        {
          text: "Mould Changes",
          link: "/dashboard/mouldchange/current",
        },
        {
          text: "Material",
          link: "/dashboard/material/current",
        },
      ]);
      // navigate("/dashboard");
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    pathDetect(location.pathname);
    console.log(linkList);
  }, [location.pathname, setLinkList]);

  return (
    <Fragment>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="TopBar">
            <TopBar
              isMenuShow={isMenuShow}
              setIsMenuShow={setIsMenuShow}
              user={user}
            />
          </div>
          <div className={isMenuShow ? "off-menu show" : "hide"}>
            <OffCanvasSideBar
              isMenuShow={isMenuShow}
              setIsMenuShow={setIsMenuShow}
              linkList={linkList}
            />
          </div>
          <div className="SideBar">
            <SideBar linkList={linkList} />
          </div>
          <div className="Workspace">
            <Animate>
              <Workspace />
            </Animate>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Dashboard;
