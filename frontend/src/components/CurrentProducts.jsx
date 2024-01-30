import React, { useRef, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faAngleRight,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import "../css/componentStyles/detailview.css";

const CurrentProducts = () => {
  const search = <FontAwesomeIcon icon={faSearch} />;
  const angle = <FontAwesomeIcon icon={faAngleRight} />;
  const angles = <FontAwesomeIcon icon={faAnglesRight} />;

  const [showPanel, setShowPanel] = useState(false);

  const table = useRef();
  const panel = useRef();
  const togglePanel = () => {
    setShowPanel(!showPanel);
    if (showPanel) {
      table.current.style.width = "60%";
      panel.current.style.width = "40%";
      panel.current.style.visibility = "visible";
      panel.current.style.display = "flex";
    } else {
      table.current.style.width = "100%";
      panel.current.style.width = "0%";
      panel.current.style.visibility = "hidden";
      panel.current.style.display = "none";
    }
  };

  return (
    <React.Fragment>
      <div className="details-container">
        <div className="top">
          <div className="search">
            <input type="text" placeholder="Search products here" />
            <div className="search-icon"> {search} </div>
          </div>
        </div>
        <div className="wrapper">
          <div className="table-container" ref={table}>
            <table>
              <tr>
                <th className="col-1">Machine No</th>
                <th className="col-2">Product Name</th>
                <th className="col-3">Start Date</th>
                <th className="col-4">Planned Qty</th>
                <th className="col-5">Current Qty</th>
                <th className="col-6">Progress</th>
                <th className="col-7">Efficieny</th>
                <th className="col-8">{angles}</th>
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
                  <Link className="arrow" onClick={(e) => togglePanel()}>
                    {angles}
                  </Link>
                </td>
              </tr>
            </table>
          </div>
          <div className="panel" ref={panel}>
            <Outlet />
            <button onClick={(e) => togglePanel()}> {">"} </button>
          </div>{" "}
        </div>
      </div>
    </React.Fragment>
  );
};

export default CurrentProducts;
