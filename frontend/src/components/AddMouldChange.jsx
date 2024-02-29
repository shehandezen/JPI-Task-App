import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";
import "../css/componentStyles/development.css";
import "../css/componentStyles/addproduct.css";


const AddMouldChange = () => {

  const floppyDisk = <FontAwesomeIcon icon={faFloppyDisk} />;
  const circleX = <FontAwesomeIcon icon={faXmark} />;
  const navigate = useNavigate();

  const [data, setData] = useState({
    MachineNo: '',
    Date: '',
    PreviousProduct: '',
    NextProduct: '',
    PlannedTime: '',
    Technician1: '',
    Technician2: '',
    ActualTime: '',
    StartTime: '',
    EndTime: '',
    Note: ''

  })


  const handleChange = (value, type) => {
    if (type == "machineNo") {
      setData({ ...data, MachineNo: value });
    } else if (type == "date") {
      setData({ ...data, Date: value });
    }else if (type == "previousproduct") {
      setData({ ...data, PreviousProduct: value });
    }
    else if (type == "nextproduct") {
      setData({ ...data, NextProduct: value });
    }
    else if (type == "plannedtime") {
      setData({ ...data, PlannedTime: value });
    }
    else if (type == "technician1") {
      setData({ ...data, Technician1: value });
    }
    else if (type == "technician2") {
      setData({ ...data, Technician2: value });
    }
    else if (type == "actualtime") {
      setData({ ...data, ActualTime: value });
    }
    else if (type == "starttime") {
      setData({ ...data, StartTime: value });
    }
    else if (type == "endtime") {
      setData({ ...data, EndTime: value });
    }
    else if (type == "note") {
      setData({ ...data, Note: value });
    }
  }

  const handleSubmit = (e) => {
    const date = new Date('YYYY-MM-DD')
    setData({...data, Date: date})
    console.log(data);
  };

  return (
    <React.Fragment>
    <div className="add-product-container">
      <div className="head">
        Add New Production
        <span className="line"></span>
      </div>
     
      <div className="inputs-container">
        <div className="input-container">
          <div className="input-label"> Machine No </div>
          <select
            name="machine"
            onChange={(e) => handleChange(e.target.value, "machineNo")}
          >
            <option value="">Machine No</option>
            <option value="IM 01">IM 01</option>
            <option value="IM 02">IM 02</option>
            <option value="IM 03">IM 03</option>
            <option value="IM 04">IM 04</option>
            <option value="IM 05">IM 05</option>
            <option value="IM 06">IM 06</option>
            <option value="IM 07">IM 07</option>
            <option value="IM 08">IM 08</option>
            <option value="IM 09">IM 09</option>
            <option value="IM 10">IM 10</option>
            <option value="IM 11">IM 11</option>
            <option value="IM 12">IM 12</option>
            <option value="IM 13">IM 13</option>
            <option value="IM 14">IM 14</option>
            <option value="IM 15">IM 15</option>
            <option value="IM 16">IM 16</option>
            <option value="IM 17">IM 17</option>
            <option value="IM 18">IM 18</option>
            <option value="IM 19">IM 19</option>
            <option value="IM 20">IM 20</option>
            <option value="IM 21">IM 21</option>
            <option value="IM 22">IM 22</option>
            <option value="IM 23">IM 23</option>
            <option value="IM 24">IM 24</option>
            <option value="IML 01">IML 01</option>
            <option value="IML 02">IML 02</option>
            <option value="IML 03">IML 03</option>
            <option value="IML 04">IML 04</option>
            <option value="IML 05">IML 05</option>
            <option value="IML 06">IML 06</option>
            <option value="BM 01">BM 01</option>
            <option value="BM 02">BM 02</option>
            <option value="BM 03">BM 03</option>
            <option value="BM 04">BM 04</option>
            <option value="BM 05">BM 05</option>
            <option value="BM 06">BM 06</option>
            <option value="BM 07">BM 07</option>
            <option value="BM 08">BM 08</option>
            <option value="BM 09">BM 09</option>
            <option value="BM 10">BM 10</option>
            <option value="IBM 01">IBM 01</option>
          </select>
        </div>
        <div className="input-container">
          <div className="input-label">  Previous Product Name </div>
          <select
            name="previousproduct"
            onChange={(e) => handleChange(e.target.value, "previousproduct")}
          >
             <option value="">Previous Product Name</option>
             <option value="IBM 01">IBM 01</option>
          </select>
        </div>
        <div className="input-container">
          <div className="input-label"> Next Product Name </div>
          <select
            name="nextproduct"
            onChange={(e) => handleChange(e.target.value, "nextproduct")}
          >
             <option value="">Next Product Name</option>
             <option value="IBM 01">IBM 01</option>
          </select>
        </div>
       
        <div className="input-container">
          <div className="input-label"> Planning Time </div>
          <input
            type="number"
            placeholder="Planning time "
            onChange={(e) => handleChange(e.target.value, "plannedtime")}
          />
        </div>
        <div className="input-container">
          <div className="input-label"> Actual Time </div>
          <input
            type="number"
            placeholder="Actual time "
            onChange={(e) => handleChange(e.target.value, "actualtime")}
          />
        </div>
        <div className="input-container">
          <div className="input-label"> Start Time </div>
          <input
            type="time"
            placeholder="Start time"
            onChange={(e) => handleChange(e.target.value, "starttime")}
          />
        </div>
        <div className="input-container">
          <div className="input-label"> End Time </div>
          <input
            type="time"
            placeholder="End Time"
            onChange={(e) => handleChange(e.target.value, "endtime")}
          />
        </div>
        <div className="input-container">
          <div className="input-label"> Technician </div>
          <input
            type="text"
            placeholder="Technician"
            onChange={(e) => handleChange(e.target.value, "technician1")}
          />
        </div>
        <div className="input-container">
          <div className="input-label"> Technician </div>
          <input
            type="text"
            placeholder="Technician"
            onChange={(e) =>
              handleChange(e.target.value, "technician2")
            }
          />
        </div>
        <div className="input-container">
          <div className="input-label"> Note </div>
          <input
            type="text"
            placeholder="Note"
            onChange={(e) => handleChange(e.target.value, "note")}
          />
        </div>
        </div>
     
      <div className=" buttons">
        <button onClick={(e) => handleSubmit(e)}>Save {floppyDisk}</button>

        <button
          style={{ background: "var(--red)" }}
          onClick={() => {
            navigate(-1);
          }}
        >
          {" "}
          {circleX} Discard
        </button>
      </div>
    </div>
  </React.Fragment>

  );
};

export default AddMouldChange;
