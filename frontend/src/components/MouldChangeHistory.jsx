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

const MouldChangeHistory = () => {

  const search = <FontAwesomeIcon icon={faSearch} />;
  // const angle = <FontAwesomeIcon icon={faAngleRight} />;
  const angles = <FontAwesomeIcon icon={faAnglesRight} />;

  const [searchText, setSearchText] = useState('')

  const searchHandle = (e) => {
    setSearchText(e.target.value)
    console.log(e.target.value)
    console.log(data.filter(obj => obj.Date.includes(searchText)))
  }


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
    _id: '154gfew65g1ew6v4',
    Date: 'dummyData',
    MachineNo: 'dummyData',
    PreviousProduct: 'dummyData',
    NextProduct: 'dummyData',
    PlannedTime: 'dummyData',
    Technicians: 'dummyData'

  }
  ])


  return (
    <React.Fragment>
      {isLoading ? <MiniLoader /> : ""}
      <div className="details-container">
        <div className="top">
          <div className="search">
            <input type="text" placeholder="Search Mould Changes" onChange={(e) => { searchHandle(e) }} />
            <div className="search-icon"> {search} </div>
          </div>
        </div>
        <div className="wrapper">
          <div className="table-container" >
            <table>
              <tr>
                <th className="col-1">Machine No</th>
                <th className="col-2">Date</th>
                <th className="col-3">Previous Product</th>
                <th className="col-4">Next Product</th>
                <th className="col-5">Technicians</th>
                <th className="col-6">Planned Time</th>
                <th className="col-8">{angles}</th>
              </tr>

              {
                data?.filter(obj => obj?.Date?.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()))?.map((element, index) => {
                  return (
                    <tr>
                      <td className="col-1">{element.MachineNo} </td>
                      <td className="col-2">{element.Date} </td>
                      <td className="col-3">{element.PreviousProduct} </td>
                      <td className="col-4">{element.NextProduct} </td>
                      <td className="col-5">{element.Technicians} </td>
                      <td className="col-6">{element.PlannedTime} </td>

                      <td className="col-8">
                        <Link to={`/dashboard/mouldchange/view/${element._id}`} className="arrow">{angles}</Link>
                      </td>
                    </tr>
                  )
                })
              }

            </table>
          </div>


        </div>
      </div>
    </React.Fragment>
  );
};

export default MouldChangeHistory;
