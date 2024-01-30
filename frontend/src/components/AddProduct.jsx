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

  const [data, setData] = useState({
    machineNo: "",
    productName: "",
    productCode: "",
    jobNo: "",
    customer: "",
    hourlyTarget: "",
    cycleTime: "",
    itemWeight: "",
    availableCavities: "",
    usingCavities: "",
    planningQty: "",
    isDoubleBag: false,
    isCardboardRequired: false,
    isSecondBagRequired: false,
    bagType: "",
    bagSize: "",
    polytheneCode: "",
    secondBagSize: "",
    polytheneCodeSecond: "",
    cardboardSize: "",
    cardboardCode: "",
    isLabelRequired: false,
    labelName: "",
    labelCode: "",
    materialName: "",
    masterbatch: "",
  });

  const handleChange = (value, type) => {
    if (type == "machineNo") {
      setData({ ...data, machineNo: value });
    } else if (type == "productName") {
      setData({ ...data, productName: value });
    } else if (type == "productCode") {
      setData({ ...data, productCode: value });
    } else if (type == "jobNo") {
      setData({ ...data, jobNo: value });
    } else if (type == "customer") {
      setData({ ...data, customer: value });
    } else if (type == "hourlyTarget") {
      setData({ ...data, hourlyTarget: value });
    } else if (type == "cycleTime") {
      setData({ ...data, cycleTime: value });
    } else if (type == "itemWeight") {
      setData({ ...data, itemWeight: value });
    } else if (type == "availableCavities") {
      setData({ ...data, availableCavities: value });
    } else if (type == "usingCavities") {
      setData({ ...data, usingCavities: value });
    } else if (type == "planningQty") {
      setData({ ...data, planningQty: value });
    } else if (type == "isDoubleBag") {
      setData({ ...data, isDoubleBag: value });
    } else if (type == "isCardboardRequired") {
      setData({ ...data, isCardboardRequired: value });
    } else if (type == "isSeconBagRequired") {
      setData({ ...data, isSeconBagRequired: value });
    } else if (type == "bagType") {
      setData({ ...data, bagType: value });
    } else if (type == "bagSize") {
      setData({ ...data, bagSize: value });
    } else if (type == "polytheneCode") {
      setData({ ...data, polytheneCode: value });
    } else if (type == "secondBagSize") {
      setData({ ...data, secondBagSize: value });
    } else if (type == "polytheneCodeSecond") {
      setData({ ...data, polytheneCodeSecond: value });
    } else if (type == "cardboardSize") {
      setData({ ...data, cardboardSize: value });
    } else if (type == "cardboardCode") {
      setData({ ...data, cardboardCode: value });
    } else if (type == "isLabelRequired") {
      setData({ ...data, isLabelRequired: value });
    } else if (type == "labelName") {
      setData({ ...data, labelName: value });
    } else if (type == "labelCode") {
      setData({ ...data, labelCode: value });
    } else if (type == "materialName") {
      setData({ ...data, materialName: value });
    } else if (type == "masterbatch") {
      setData({ ...data, masterbatch: value });
    }
  };

  const [polySize, setPolySize] = useState([
    "18x30",
    "20x32",
    "24x54",
    "16x37",
  ]);

  const [cardboardSize, setCardboardSize] = useState([
    "40mmx35mmx20mm",
    "40mmx35mmx25mm",
    "40mmx35mmx30mm",
    "40mmx35mmx35mm",
  ]);

  const handleSubmit = (e) => {
    console.log(data);
  };

  const [isDoubleBag, setIsDoubleBag] = useState(false);
  const [showSecondBag, setShowSecondBag] = useState(false);
  const [showCardboard, setShowCardboard] = useState(false);
  const [showLabel, setShowLabel] = useState(false);

  const handleCheck = (value, type) => {
    console.log(value, type);
    if (type == "doubleBag") {
      setIsDoubleBag(!isDoubleBag);
      setData({ ...data, isDoubleBag: value });
    } else if (type == "cardboard") {
      setShowCardboard(!showCardboard);
      setData({ ...data, isCardboardRequired: value });
    } else if (type == "secondBag") {
      setShowSecondBag(!showSecondBag);
      setData({ ...data, isSeconBagRequired: value });
    } else if (type == "label") {
      setShowLabel(!showLabel);
      setData({ ...data, isLabelRequired: value });
    }
  };

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
            <div className="input-label"> Product Name </div>
            <input
              type="text"
              placeholder="Product Name"
              onChange={(e) => handleChange(e.target.value, "productName")}
            />
          </div>
          <div className="input-container">
            <div className="input-label"> Product Code </div>
            <input
              type="text"
              placeholder="Product Code"
              onChange={(e) => handleChange(e.target.value, "productCode")}
            />
          </div>
          <div className="input-container">
            <div className="input-label"> Job No </div>
            <input
              type="number"
              placeholder="Job No"
              onChange={(e) => handleChange(e.target.value, "jobNo")}
            />
          </div>
          <div className="input-container">
            <div className="input-label"> Customer </div>
            <input
              type="text"
              placeholder="Customer"
              onChange={(e) => handleChange(e.target.value, "customer")}
            />
          </div>
          <div className="input-container">
            <div className="input-label"> Hourly Target </div>
            <input
              type="number"
              placeholder="Hourly Target"
              onChange={(e) => handleChange(e.target.value, "hourlyTarget")}
            />
          </div>
          <div className="input-container">
            <div className="input-label"> Cycle Time </div>
            <input
              type="number"
              placeholder="Cycle Time"
              onChange={(e) => handleChange(e.target.value, "cycleTime")}
            />
          </div>
          <div className="input-container">
            <div className="input-label"> Item Weight </div>
            <input
              type="number"
              placeholder="Item Weight"
              onChange={(e) => handleChange(e.target.value, "itemWeight")}
            />
          </div>
          <div className="input-container">
            <div className="input-label"> Available No of cavities </div>
            <input
              type="number"
              placeholder="Standard No of cavities"
              onChange={(e) =>
                handleChange(e.target.value, "availableCavities")
              }
            />
          </div>
          <div className="input-container">
            <div className="input-label"> Using No of cavities </div>
            <input
              type="number"
              placeholder="Using No of cavities"
              onChange={(e) => handleChange(e.target.value, "usingCavities")}
            />
          </div>
          <div className="input-container">
            <div className="input-label"> Planning Qty </div>
            <input
              type="number"
              placeholder=" Planning Qty"
              onChange={(e) => handleChange(e.target.value, "planningQty")}
            />
          </div>
        </div>
        <div className="section-head">Package Details</div>
        <div className="note">
          <div className="note-line">
            <div class="checkbox-wrapper-12">
              <div class="cbx">
                <input
                  id="cbx-12"
                  type="checkbox"
                  onChange={(e) => handleCheck(e.target.value, "doubleBag")}
                />
                <label for="cbx-12"></label>
                <svg width="15" height="14" viewbox="0 0 15 14" fill="none">
                  <path d="M2 8.36364L6.23077 12L13 2"></path>
                </svg>
              </div>

              <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                  <filter id="goo-12">
                    <fegaussianblur
                      in="SourceGraphic"
                      stddeviation="4"
                      result="blur"
                    ></fegaussianblur>
                    <fecolormatrix
                      in="blur"
                      mode="matrix"
                      values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
                      result="goo-12"
                    ></fecolormatrix>
                    <feblend in="SourceGraphic" in2="goo-12"></feblend>
                  </filter>
                </defs>
              </svg>
            </div>
            <div className="note-text">Is Double Bag?</div>
          </div>
          <div className="note-line">
            <div class="checkbox-wrapper-12">
              <div class="cbx">
                <input
                  id="cbx-12"
                  type="checkbox"
                  onChange={(e) => handleCheck(e.target.value, "cardboard")}
                />
                <label for="cbx-12"></label>
                <svg width="15" height="14" viewbox="0 0 15 14" fill="none">
                  <path d="M2 8.36364L6.23077 12L13 2"></path>
                </svg>
              </div>

              <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                  <filter id="goo-12">
                    <fegaussianblur
                      in="SourceGraphic"
                      stddeviation="4"
                      result="blur"
                    ></fegaussianblur>
                    <fecolormatrix
                      in="blur"
                      mode="matrix"
                      values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
                      result="goo-12"
                    ></fecolormatrix>
                    <feblend in="SourceGraphic" in2="goo-12"></feblend>
                  </filter>
                </defs>
              </svg>
            </div>
            <div className="note-text">Is Cardboard required?</div>
          </div>
          <div className="note-line">
            <div class="checkbox-wrapper-12">
              <div class="cbx">
                <input
                  id="cbx-12"
                  type="checkbox"
                  onChange={(e) => handleCheck(e.target.value, "secondBag")}
                />
                <label for="cbx-12"></label>
                <svg width="15" height="14" viewbox="0 0 15 14" fill="none">
                  <path d="M2 8.36364L6.23077 12L13 2"></path>
                </svg>
              </div>

              <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                  <filter id="goo-12">
                    <fegaussianblur
                      in="SourceGraphic"
                      stddeviation="4"
                      result="blur"
                    ></fegaussianblur>
                    <fecolormatrix
                      in="blur"
                      mode="matrix"
                      values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
                      result="goo-12"
                    ></fecolormatrix>
                    <feblend in="SourceGraphic" in2="goo-12"></feblend>
                  </filter>
                </defs>
              </svg>
            </div>
            <div className="note-text">Is Second bag required?</div>
          </div>
        </div>
        <div className="inputs-container">
          <div className="input-container">
            <div className="input-label"> Bag type </div>
            <select
              name="bag"
              onChange={(e) => handleChange(e.target.value, "bagType")}
            >
              <option value="">Bag type</option>
              <option value="Cotton bag">Cotton bag</option>
              <option value="Polythene bag">Polythene bag</option>
            </select>
          </div>
          <div className="input-container">
            <div className="input-label"> Bag Size </div>
            <select
              name="bagSize"
              onChange={(e) => handleChange(e.target.value, "bagSize")}
            >
              <option value="">Bag Size</option>
              {polySize?.map((ele, index) => {
                return (
                  <option key={index} value={ele}>
                    {ele}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="input-container">
            <div className="input-label"> Polythene Code </div>
            <input
              type="text"
              placeholder=" Polythene Code"
              onChange={(e) => handleChange(e.target.value, "polytheneCode")}
            />
          </div>
          <div className="input-container">
            <div className="input-label"> Items per Packet </div>
            <input
              type="number"
              placeholder="Items per Packet"
              onChange={(e) => handleChange(e.target.value, "itemsPerPacket")}
            />
          </div>
          {showSecondBag ? (
            <>
              {" "}
              <div className="input-container">
                <div className="input-label"> Second bag Size </div>
                <select
                  name="secondBag"
                  onChange={(e) =>
                    handleChange(e.target.value, "secondBagSize")
                  }
                >
                  <option value="">Second Bag Size</option>
                  {polySize?.map((ele, index) => {
                    return (
                      <option key={index} value={ele}>
                        {ele}
                      </option>
                    );
                  })}
                </select>
              </div>{" "}
              <div className="input-container">
                <div className="input-label"> Polythene Code (second) </div>
                <input
                  type="text"
                  placeholder=" Polythene Code (second)"
                  onChange={(e) =>
                    handleChange(e.target.value, "polytheneCodeSecond")
                  }
                />
              </div>
            </>
          ) : (
            ""
          )}

          {showCardboard ? (
            <>
              <div className="input-container">
                <div className="input-label"> Cardboard Size </div>
                <select
                  name="cardboard"
                  onChange={(e) =>
                    handleChange(e.target.value, "cardboardSize")
                  }
                >
                  <option value="">Cardboard Size</option>
                  {cardboardSize?.map((ele, index) => {
                    return (
                      <option key={index} value={ele}>
                        {ele}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="input-container">
                <div className="input-label">Cardboard Code </div>
                <input
                  type="text"
                  placeholder="Cardboard Code"
                  onChange={(e) =>
                    handleChange(e.target.value, "cardboardCode")
                  }
                />
              </div>{" "}
            </>
          ) : (
            ""
          )}
        </div>
        <div className="section-head">Material Details</div>
        <div className="note">
          <div className="note-line">
            <div class="checkbox-wrapper-12">
              <div class="cbx">
                <input
                  id="cbx-12"
                  type="checkbox"
                  onChange={(e) => handleCheck(e.target.value, "label")}
                />
                <label for="cbx-12"></label>
                <svg width="15" height="14" viewbox="0 0 15 14" fill="none">
                  <path d="M2 8.36364L6.23077 12L13 2"></path>
                </svg>
              </div>

              <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                  <filter id="goo-12">
                    <fegaussianblur
                      in="SourceGraphic"
                      stddeviation="4"
                      result="blur"
                    ></fegaussianblur>
                    <fecolormatrix
                      in="blur"
                      mode="matrix"
                      values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
                      result="goo-12"
                    ></fecolormatrix>
                    <feblend in="SourceGraphic" in2="goo-12"></feblend>
                  </filter>
                </defs>
              </svg>
            </div>
            <div className="note-text">Is Label required?</div>
          </div>
        </div>
        <div className="inputs-container">
          <div className="input-container">
            <div className="input-label">Material Name </div>
            <input
              type="text"
              placeholder="Material Name"
              onChange={(e) => handleChange(e.target.value, "materialName")}
            />
          </div>
          <div className="input-container">
            <div className="input-label">Masterbatch </div>
            <input
              type="text"
              placeholder="Masterbatch"
              onChange={(e) => handleChange(e.target.value, "masterbatch")}
            />
          </div>
          {showLabel ? (
            <>
              <div className="input-container">
                <div className="input-label">Label Name</div>
                <input
                  type="text"
                  placeholder="Label Name"
                  onChange={(e) => handleChange(e.target.value, "labelName")}
                />
              </div>
              <div className="input-container">
                <div className="input-label">Label Code </div>
                <input
                  type="text"
                  placeholder="Label Code"
                  onChange={(e) => handleChange(e.target.value, "labelCode")}
                />
              </div>
            </>
          ) : (
            ""
          )}
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

export default AddProduct;
