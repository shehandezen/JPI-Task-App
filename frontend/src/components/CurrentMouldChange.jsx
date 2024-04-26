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
import { getMouldChangeData, getMouldChanges } from "../app.service";
import { toast, ToastContainer, Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { toastConfig } from "../toastConfig";

const CurrentMouldChange = () => {
  const search = <FontAwesomeIcon icon={faSearch} />;
  // const angle = <FontAwesomeIcon icon={faAngleRight} />;
  const angles = <FontAwesomeIcon icon={faAnglesRight} />;
  const date = new Date();

  const [searchText, setSearchText] = useState("");

  const searchHandle = (e) => {
    setSearchText(e.target.value);
  };

  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const response = await getMouldChanges(
      `{"date":"${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}","status":"On Going"}`
    );

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

  const [data, setData] = useState([]);

  return (
    <React.Fragment>
    <ToastContainer />
      {isLoading ? <MiniLoader /> : ""}
      <div className="details-container">
        <div className="top">
          <div className="search">
            <input
              type="text"
              placeholder="Search Mould Changes"
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
                  <th className="col-2">Previous Product</th>
                  <th className="col-3">Next Product</th>
                  <th className="col-4">Planned Time</th>
                  <th className="col-5">Status</th>
                  <th className="col-5">Technicians</th>

                  <th className="col-8">{angles}</th>
                </tr>
              </thead>
              <tbody>
                {data
                  ?.filter((obj) =>
                    obj?.machineNo
                      ?.toLocaleLowerCase()
                      .includes(searchText.toLocaleLowerCase())
                  )
                  ?.map((element, index) => {
                    return (
                      <tr key={index}>
                        <td className="col-1">{element.machineNo} </td>
                        <td className="col-2">
                          {element.previousProduct != undefined? element.previousProduct?.productName : "No Mould"}
                        </td>
                        <td className="col-3">
                          {element.nextProduct?.productName}{" "}
                        </td>
                        <td className="col-4">{element.plannedTime} </td>
                        <td className="col-4">
                          {" "}
                          <span className="box"> {element.status} </span>
                        </td>

                        <td className="col-5">
                        {element.technician1}
                        {element.technician2 != "" ? `, ${element.technician2}`
                          : ""}
                        </td>

                        <td className="col-8">
                          <Link
                            to={`/dashboard/mouldchange/view/${element._id}`}
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
                    obj?.machineNo?.toLocaleLowerCase().includes(
                      searchText.toLocaleLowerCase()
                    )
                  ).length == 0 ? <tr> <div className="empty-message">There are no data to show.</div></tr> : null
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CurrentMouldChange;
