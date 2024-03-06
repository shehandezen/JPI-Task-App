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

  const [isLoading, setIsLoading] = useState(false)

  const fetchData = async () => {
    setIsLoading(true)
    await setInterval(() => {
      console.log('data fetching...')
      setIsLoading(false)
    }, 5000)


  }

  useEffect(() => {
    fetchData()
  }, [])

  const [data, setDate] = useState([{
    _id: '4erg62hdf6h5h2dfh',
    MachineNo: 'dummyData',
    ProductName: 'dummyData',
    StartDate: 'dummyData',
    PlannedQty: 'dummyData',
    CurrentQty: 'dummyData',
    Progress: 'dummyData',
    Efficiency: 'dummyData'
  }])

  const [searchText, setSearchText] = useState('')

  const searchHandle = (e) => {
    setSearchText(e.target.value)
    console.log(e.target.value)
    console.log(data.filter(obj => obj.ProductName.includes(searchText)))
  }



  return (
    <React.Fragment>
      {isLoading ? <MiniLoader /> : ""}

      <div className="details-container">
        <div className="top">
          <div className="search">
            <input type="text" placeholder="Search products here" onChange={(e) => { searchHandle(e) }} />
            <div className="search-icon"> {search} </div>
          </div>
        </div>
        <div className="wrapper">
          <div className="table-container" >
            <table>
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

              {
                data?.filter(obj => obj?.ProductName?.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()))?.map((element, index) => {
                  return (
                    <tr>
                      <td className="col-1">{element.MachineNo} </td>
                      <td className="col-2">{element.ProductName} </td>
                      <td className="col-3">{element.StartDate} </td>
                      <td className="col-4">{element.PlannedQty} </td>
                      <td className="col-5">{element.CurrentQty} </td>
                      <td className="col-6">{element.Progress} </td>
                      <td className="col-7">{element.Efficiency} </td>
                      <td className="col-8">
                        <Link to={`/dashboard/view/${element._id}`} className="arrow">{angles}</Link>
                      </td>
                    </tr>
                  )
                })
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
            </table>
          </div>


        </div>
      </div>
    </React.Fragment>
  );
};

export default CurrentProducts;
