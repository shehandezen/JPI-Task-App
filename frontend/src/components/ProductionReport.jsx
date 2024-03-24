import React, { useRef, useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faAngleRight,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import '../css/componentStyles/productionreport.css'
import MiniLoader from "./MiniLoader";
import { getProductionReports } from "../app.service";


const ProductionReport = ()=>{
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

  const [data, setData] = useState([])


  
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = async () => {
    setIsLoading(true);
    const response = await getProductionReports('{}');
    await setData(response.data.data);
    console.log(response);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData()
  }, [])

  const [searchText, setSearchText] = useState('')

  const searchHandle = (e) => {
    setSearchText(e.target.value)
    console.log(e.target.value)
    console.log(data.filter(obj => obj.Date.includes(searchText) ))
  }



  return (
    <React.Fragment>
       {isLoading ? <MiniLoader /> : ""}
      <div className="details-container">
        <div className="top">
          <div className="search">
            <input type="text" placeholder="Search Production reports" onChange={(e) => { searchHandle(e) }} />
            <div className="search-icon"> {search} </div>
          </div>
        </div>
        <div className="wrapper">
          <div className="table-container" >
            <table>
              <thead>
              <tr>
                <th className="col-1">No</th>
                <th className="col-2">Date</th>
                <th className="col-3">Shift</th>
                <th className="col-4">Supervisor</th>
                <th className="col-5" style={{display:'table-cell'}}>Status</th>
                <th className="col-8">{angles}</th>
              </tr>
              </thead>
              <tbody>
              {
                data?.filter(obj => obj?.Date?.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) )?.map((element, index) => {
                  return (
                    <tr key={index}>
                      <td className="col-1">{index+1} </td>
                      <td className="col-2">{element.Date} </td>
                      <td className="col-3">{element.Shift} </td>
                      <td className="col-4">{element.Supervisor} </td>
                      <td className="col-5" style={{display:'table-cell'}}>{element.Status == 'Active'? ( <div className="box"> Active</div> ): (<div className="box done"> Finished</div> )} </td>
                      
                      <td className="col-8">
                        <Link to={`/dashboard/production/view/${element._id}`} className="arrow">{angles}</Link>
                      </td>
                    </tr>
                  )
                })
              }
              </tbody>
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
}

export default ProductionReport