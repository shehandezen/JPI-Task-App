import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";
import "../css/componentStyles/development.css";
import "../css/componentStyles/addproduct.css";
import MiniLoader from "./MiniLoader";
import { addMouldChange, addProduct, getProducts } from "../app.service";

const AddMouldChange = () => {
  const floppyDisk = <FontAwesomeIcon icon={faFloppyDisk} />;
  const circleX = <FontAwesomeIcon icon={faXmark} />;
  const navigate = useNavigate();
  const date = new Date();

  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
   
    const response = await getProducts(encodeURI('{"status":"NOT ACTIVE"}'))
    console.log(response.data.data)
    await setNextProduct(response.data.data)
    const result = await getProducts(encodeURI('{"status":"ACTIVE"}'))
    console.log(result.data.data)
    await setPreviousProduct(result.data.data)
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [data, setData] = useState({
    machineNo: "",
    date: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
    previousProduct: "",
    nextProduct: "",
    plannedTime: "",
    technician1: "",
    technician2: "",
    actualTime: "",
    startTime: "",
    endTime: "",
    note: "",
  });

  const [previousProduct, setPreviousProduct] = useState([
    ,
  ]);
  const [nextProduct, setNextProduct] = useState([
   
  ]);

  const handleChange = (value, type) => {
    if (type == "machineNo") {
      setData({ ...data, MachineNo: value });
    } else if (type == "date") {
      setData({ ...data, Date: value });
    } else if (type == "previousproduct") {
      setData({ ...data, PreviousProduct: value });
    } else if (type == "nextproduct") {
      setData({ ...data, NextProduct: value });
    } else if (type == "plannedtime") {
      setData({ ...data, PlannedTime: value });
    } else if (type == "technician1") {
      setData({ ...data, Technician1: value });
    } else if (type == "technician2") {
      setData({ ...data, Technician2: value });
    } else if (type == "actualtime") {
      setData({ ...data, ActualTime: value });
    } else if (type == "starttime") {
      setData({ ...data, StartTime: value });
    } else if (type == "endtime") {
      setData({ ...data, EndTime: value });
    } else if (type == "note") {
      setData({ ...data, Note: value });
    }
  };

  const handleSubmit = async (e) => {
    // const date = new Date()
    // console.log(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`)
    // await setData({...data, Date: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`})
    let create = await addMouldChange(data)
    console.log(create);
  };

  return (
    <React.Fragment>
      {isLoading ? <MiniLoader /> : ""}
      <div className="add-product-container">
        <div className="head">
          Add New Mould Change
          <span className="line"></span>
        </div>

        <div className="inputs-container">
          <div className="input-container">
            <div className="input-label"> Machine No </div>
            <select
              name="machine"
              value={data.MachineNo}
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
            <div className="input-label"> Previous Product Name </div>
            <select
              name="previousproduct"
              value={data.PreviousProduct}
              onChange={(e) => handleChange(e.target.value, "previousproduct")}
            >
              <option value="">Previous Product Name</option>
              {previousProduct.map((ele, index) => (
                <option key={index} value={ele._id}>
                  {ele.productName}
                </option>
              ))}
            </select>
          </div>
          <div className="input-container">
            <div className="input-label"> Next Product Name </div>
            <select
              name="nextproduct"
              value={data.NextProduct}
              onChange={(e) => handleChange(e.target.value, "nextproduct")}
            >
              <option value="">Next Product Name</option>
              {nextProduct.map((ele, index) => (
                <option key={index} value={ele._id}>
                  {ele.productName}
                </option>
              ))}
            </select>
          </div>

          <div className="input-container">
            <div className="input-label"> Planning Time </div>
            <input
              type="number"
              placeholder="Planning time "
              value={data.PlannedTime}
              onChange={(e) => handleChange(e.target.value, "plannedtime")}
            />
          </div>
          <div className="input-container">
            <div className="input-label"> Actual Time </div>
            <input
              type="number"
              placeholder="Actual time "
              value={data.ActualTime}
              onChange={(e) => handleChange(e.target.value, "actualtime")}
            />
          </div>
          <div className="input-container">
            <div className="input-label"> Start Time </div>
            <input
              type="time"
              placeholder="Start time"
              value={data.StartTime}
              onChange={(e) => handleChange(e.target.value, "starttime")}
            />
          </div>
          <div className="input-container">
            <div className="input-label"> End Time </div>
            <input
              type="time"
              placeholder="End Time"
              value={data.EndTime}
              onChange={(e) => handleChange(e.target.value, "endtime")}
            />
          </div>
          <div className="input-container">
            <div className="input-label"> Technician </div>
            <input
              type="text"
              placeholder="Technician"
              value={data.Technician1}
              onChange={(e) => handleChange(e.target.value, "technician1")}
            />
          </div>
          <div className="input-container">
            <div className="input-label"> Technician </div>
            <input
              type="text"
              placeholder="Technician"
              value={data.Technician2}
              onChange={(e) => handleChange(e.target.value, "technician2")}
            />
          </div>
          <div className="input-container">
            <div className="input-label"> Note </div>
            <input
              type="text"
              placeholder="Note"
              value={data.Note}
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
