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

const CurrentMouldChange = () => {
  const search = <FontAwesomeIcon icon={faSearch} />;
  // const angle = <FontAwesomeIcon icon={faAngleRight} />;
  const angles = <FontAwesomeIcon icon={faAnglesRight} />;
  const date = new Date();


  const [searchText, setSearchText] = useState("");

  const searchHandle = (e) => {
    setSearchText(e.target.value);
    console.log(e.target.value);
    console.log(data.filter((obj) => obj.machineNo.includes(searchText)));
  };

  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const response = await getMouldChanges(`{"date":"${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}"}`)
    console.log(response.data)
    setData(response?.data?.data)
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [data, setData] = useState([]);

  return (
    <React.Fragment>
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
              <tr>
                <th className="col-1">Machine No</th>
                <th className="col-2">Previous Product</th>
                <th className="col-3">Next Product</th>
                <th className="col-4">Planned Time</th>
                <th className="col-5">Status</th>
                <th className="col-5">Technicians</th>
            
                <th className="col-8">{angles}</th>
              </tr>

              {data
                ?.filter((obj) =>
                  obj?.machineNo?.toLocaleLowerCase().includes(
                    searchText.toLocaleLowerCase()
                  )
                )
                ?.map((element, index) => {
                  return (
                    <tr>
                      <td className="col-1">{element.machineNo} </td>
                      <td className="col-2">{element.previousProduct?.productName} </td>
                      <td className="col-3">{element.nextProduct?.productName} </td>
                      <td className="col-4">{element.plannedTime} </td>
                      <td className="col-4"> <span className="box"> {element.status} </span></td>

                      <td className="col-5">{`${element.technician1}, ${element.technician2}` } </td>

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
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CurrentMouldChange;
