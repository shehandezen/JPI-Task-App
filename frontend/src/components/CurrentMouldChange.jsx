import React, { useRef, useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faAngleRight,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import "../css/componentStyles/detailview.css";

const CurrentMouldChange = () => {

  const search = <FontAwesomeIcon icon={faSearch} />;
  // const angle = <FontAwesomeIcon icon={faAngleRight} />;
  const angles = <FontAwesomeIcon icon={faAnglesRight} />;

  const [searchText, setSearchText] = useState('')

  const searchHandle = (e) => {
    setSearchText(e.target.value)
    console.log(e.target.value)
    console.log(data.filter(obj => obj.MachineNo.includes(searchText) ))
  }
  const [data, setDate] = useState([{
    _id: '154gfew65g1ew6v4',
    MachineNo: 'Im 01',
    PreviousProduct: '4L lid',
    NextProduct: '1L Can lid',
    PlannedTime: '60 Min.',
    Technicians: 'Technician 1, Technician 2'

  },
  {
    _id: '154gfew65g1ew6v4',
    MachineNo: 'Im 01',
    PreviousProduct: '4L lid',
    NextProduct: '1L Can lid',
    PlannedTime: '60 Min.',
    Technicians: 'Technician 1, Technician 2'
    
  },
  {
    _id: '154gfew65g1ew6v4',
    MachineNo: 'Im 01',
    PreviousProduct: '4L lid',
    NextProduct: '1L Can lid',
    PlannedTime: '60 Min.',
    Technicians: 'Technician 1, Technician 2'
    
  },
  {
    _id: '154gfew65g1ew6v4',
    MachineNo: 'Im 01',
    PreviousProduct: '4L lid',
    NextProduct: '1L Can lid',
    PlannedTime: '60 Min.',
    Technicians: 'Technician 1, Technician 2'
    
  },
  {
    _id: '154gfew65g1ew6v4',
    MachineNo: 'Im 01',
    PreviousProduct: '4L lid',
    NextProduct: '1L Can lid',
    PlannedTime: '60 Min.',
    Technicians: 'Technician 1, Technician 2'
    
  },
  
  ])


  return (
    <React.Fragment>
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
              <th className="col-2">Previous Product</th>
              <th className="col-3">Next Product</th>
              <th className="col-4">Technicians</th>
              <th className="col-5">Planned Time</th>
              <th className="col-8">{angles}</th>
            </tr>

            {
              data?.filter(obj => obj?.MachineNo?.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) )?.map((element, index) => {
                return (
                  <tr>
                    <td className="col-1">{element.MachineNo} </td>
                    <td className="col-2">{element.PreviousProduct} </td>
                    <td className="col-3">{element.NextProduct} </td>
                    <td className="col-4">{element.PlannedTime} </td>
                    <td className="col-5">{element.Technicians} </td>
                    
                    <td className="col-8">
                      <Link to={`/dashboard/view/${element._id}`} className="arrow">{angles}</Link>
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

export default CurrentMouldChange;
