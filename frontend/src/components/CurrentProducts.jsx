import React, { useRef, useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faAngleRight,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import "../css/componentStyles/detailview.css";
import MiniLoader from "./MiniLoader";
import { getProducts } from "../app.service";
import { toast, ToastContainer, Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { toastConfig } from "../toastConfig";

const CurrentProducts = () => {
  const search = <FontAwesomeIcon icon={faSearch} />;
  // const angle = <FontAwesomeIcon icon={faAngleRight} />;
  const angles = <FontAwesomeIcon icon={faAnglesRight} />;

  // const [showPanel, setShowPanel] = useState(false);

  // const table = useRef();
  // const panel = useRef();
  // const togglePanel = () => {
  //   setShowPanel(!showPanel);
  //   if (showPanel) {
  //     table.current.style.width = "60%";
  //     panel.current.style.width = "40%";
  //     panel.current.style.visibility = "visible";
  //   } else {
  //     table.current.style.width = "99%";
  //     panel.current.style.width = "0%";
  //     panel.current.style.visibility = "hidden";
  //   }
  // };
  
  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const response = await getProducts('{"status":"Active"}');
    if(response.status == 200){
      setData(response?.data?.data);
      toast.success('The data is fetched!' , toastConfig)
    }else if(response.status == 500){
      toast.error('Backend error!', toastConfig)
    }else{
      toast.error('Something went wrong!', toastConfig)
    }
    

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);


  const [searchText, setSearchText] = useState("");

  const searchHandle = (e) => {
    setSearchText(e.target.value);
    console.log(e.target.value);
    console.log(data.filter((obj) => obj.productName.includes(searchText)));
  };

  return (
    <React.Fragment>
      {isLoading ? <MiniLoader /> : ""}
      <ToastContainer />
      <div className="details-container">
        <div className="top">
          <div className="search">
            <input
              type="text"
              placeholder="Search products here"
              onChange={(e) => {
                searchHandle(e);
              }}
            />
            <div className="search-icon"> {search} </div>
          </div>
        </div>
        <div className="wrapper">
          <div className="table-container">
            <table>
              <thead>
              <tr>
                <th className="col-1">Machine No</th>
                <th className="col-2">Product Name</th>
                <th className="col-3">Start Date</th>
                <th className="col-4">Planned Qty</th>
                <th className="col-5">Current Qty</th>
                <th className="col-6">Progress</th>
                <th className="col-7">Efficiency</th>
                <th className="col-8">{angles}</th>
              </tr>
              </thead>
              <tbody>
              {data
                ?.filter((obj) =>
                  obj?.productName?.toLocaleLowerCase().includes(
                    searchText.toLocaleLowerCase()
                  )
                )
                ?.map((element, index) => {
                  return (
                    <tr key={index}>
                      <td className="col-1">{element.machineNo} </td>
                      <td className="col-2">{element.productName} </td>
                      <td className="col-3">{element.startDate} </td>
                      <td className="col-4">{element.planningQty} </td>
                      <td className="col-5">{element.proceedQty} </td>
                      <td className="col-6">
                        {(element.proceedQty / element.planningQty) * 100}
                      </td>
                      <td className="col-7">
                        {(((element.proceedQty / element.hourlyTarget) *
                          element.usingCavities) /
                          element.totalhours) *
                          100}
                      </td>
                      <td className="col-8">
                        <Link
                          to={`/dashboard/view/${element._id}`}
                          className="arrow"
                        >
                          {angles}
                        </Link>
                      </td>
                    </tr>
                  );
                })}
                {
                  data
                  ?.filter((obj) =>
                    obj?.productName?.toLocaleLowerCase().includes(
                      searchText.toLocaleLowerCase()
                    )
                  ).length == 0 ? <tr> <div className="empty-message">There are no data to show.</div></tr> : null
                }
              {/* <tr>
                <td className="col-1">Sample </td>
                <td className="col-2">Sample </td>
                <td className="col-3">Sample </td>
                <td className="col-4">Sample </td>
                <td className="col-5">Sample </td>
                <td className="col-6">Sample </td>
                <td className="col-7">Sample </td>
                <td className="col-8">
                  {" "}
                  <Link className="arrow">{angles}</Link>
                </td>
              </tr>
              <tr>
                <td className="col-1">Sample </td>
                <td className="col-2">Sample </td>
                <td className="col-3">Sample </td>
                <td className="col-4">Sample </td>
                <td className="col-5">Sample </td>
                <td className="col-6">Sample </td>
                <td className="col-7">Sample </td>
                <td className="col-8">
                  {" "}
                  <Link
                    className="arrow"
                    to={"/dashboard/view/12544f"}
                   
                  >
                    {angles}
                  </Link>
                </td>
              </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CurrentProducts;
