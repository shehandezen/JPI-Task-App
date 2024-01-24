import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";
import "../css/componentStyles/development.css";
import "../css/componentStyles/addproduct.css";

const AddProduct = () => {
  const floppyDisk = <FontAwesomeIcon icon={faFloppyDisk} />;
  const circleX = <FontAwesomeIcon icon={faXmark} />;
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <div className="add-product-container">
        <div className="head">
          Add New Production
          <span className="line"></span>
        </div>
        <div className="section-head">General Details</div>
        <div className="inputs-container">
          <div className="input-container">
            <div className="input-label"> Machine No </div>
            <select name="machine">
              <option value="">Machine No</option>
              <option value="">IM 01</option>
              <option value="">IM 02</option>
              <option value="">IM 03</option>
              <option value="">IM 04</option>
              <option value="">IM 05</option>
              <option value="">IM 06</option>
              <option value="">IM 07</option>
              <option value="">IM 08</option>
              <option value="">IM 09</option>
              <option value="">IM 10</option>
              <option value="">IM 11</option>
              <option value="">IM 12</option>
              <option value="">IM 13</option>
              <option value="">IM 14</option>
              <option value="">IM 15</option>
              <option value="">IM 16</option>
              <option value="">IM 17</option>
              <option value="">IM 18</option>
              <option value="">IM 19</option>
              <option value="">IM 20</option>
              <option value="">IM 21</option>
              <option value="">IM 22</option>
              <option value="">IM 23</option>
              <option value="">IM 24</option>
              <option value="">IML 01</option>
              <option value="">IML 02</option>
              <option value="">IML 03</option>
              <option value="">IML 04</option>
              <option value="">IML 05</option>
              <option value="">IML 06</option>
              <option value="">BM 01</option>
              <option value="">BM 02</option>
              <option value="">BM 03</option>
              <option value="">BM 04</option>
              <option value="">BM 05</option>
              <option value="">BM 06</option>
              <option value="">BM 07</option>
              <option value="">BM 08</option>
              <option value="">BM 09</option>
              <option value="">BM 10</option>
              <option value="">IBM 01</option>
            </select>
          </div>
          <div className="input-container">
            <div className="input-label"> Product Name </div>
            <input type="text" placeholder="Product Name" />
          </div>
          <div className="input-container">
            <div className="input-label"> Product Code </div>
            <input type="text" placeholder="Product Code" />
          </div>
          <div className="input-container">
            <div className="input-label"> Job No </div>
            <input type="number" placeholder="Job No" />
          </div>
          <div className="input-container">
            <div className="input-label"> Customer </div>
            <input type="text" placeholder="Customer" />
          </div>
          <div className="input-container">
            <div className="input-label"> Hourly Target </div>
            <input type="number" placeholder="Hourly Target" />
          </div>
          <div className="input-container">
            <div className="input-label"> Cycle Time </div>
            <input type="number" placeholder="Cycle Time" />
          </div>
          <div className="input-container">
            <div className="input-label"> Item Weight </div>
            <input type="number" placeholder="Item Weight" />
          </div>
          <div className="input-container">
            <div className="input-label"> Available No of cavities </div>
            <input type="number" placeholder="Standard No of cavities" />
          </div>
          <div className="input-container">
            <div className="input-label"> Using No of cavities </div>
            <input type="number" placeholder="Using No of cavities" />
          </div>
          <div className="input-container">
            <div className="input-label"> Planning Qty </div>
            <input type="number" placeholder=" Planning Qty" />
          </div>
        </div>
        <div className="section-head">Package Details</div>
        <div className="inputs-container">
          <div className="input-container">
            <div className="input-label"> Bag type </div>
            <select name="bag">
              <option value="">Bag type</option>
              <option value="">Cotton bag</option>
              <option value="">Polythene bag</option>
            </select>
          </div>
          <div className="input-container">
            <div className="input-label"> Bag Size </div>
            <input type="number" placeholder="Bag Size " />
          </div>
          <div className="input-container">
            <div className="input-label"> Polythene Code </div>
            <input type="number" placeholder=" Polythene Code" />
          </div>
          <div className="input-container">
            <div className="input-label"> Items per Packet </div>
            <input type="number" placeholder="Items per Packet" />
          </div>
          <div className="input-container">
            <div className="input-label"> Second bag Size </div>
            <input type="number" placeholder="Second bag Size" />
          </div>
          <div className="input-container">
            <div className="input-label"> Polythene Code (second) </div>
            <input type="number" placeholder=" Polythene Code (second)" />
          </div>
          <div className="input-container">
            <div className="input-label"> Cardboard Size </div>
            <input type="number" placeholder=" Cardboard Size" />
          </div>
          <div className="input-container">
            <div className="input-label">Cardboard Code </div>
            <input type="number" placeholder="Cardboard Code" />
          </div>
        </div>
        <div className="section-head">Material Details</div>
        <div className="inputs-container">
          <div className="input-container">
            <div className="input-label">Material type </div>
            <input type="number" placeholder="Material type" />
          </div>
          <div className="input-container">
            <div className="input-label">Master batch </div>
            <input type="number" placeholder="Master batch" />
          </div>
          <div className="input-container">
            <div className="input-label">Label Name</div>
            <input type="number" placeholder="Label Name" />
          </div>
          <div className="input-container">
            <div className="input-label">Label Code </div>
            <input type="number" placeholder="Label Code" />
          </div>
        </div>

        <div className="inputs-container buttons">
          <button>Save {floppyDisk}</button>

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

export default AddProduct;
