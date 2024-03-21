import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";
import "../css/componentStyles/development.css";
import "../css/componentStyles/addproduct.css";
import MiniLoader from "./MiniLoader";
import { addProduct, getMaterialData } from "../app.service";
import MessageBox from "./MessageBox";

const AddProduct = () => {
  const floppyDisk = <FontAwesomeIcon icon={faFloppyDisk} />;
  const circleX = <FontAwesomeIcon icon={faXmark} />;
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const messageTimer = setTimeout(() => {
      setMessages([]);
    }, 3000);

    return () => {
      clearTimeout(messageTimer);
    };
  }, [messages]);

  const [data, setData] = useState({
    machineNo: "",
    productName: "",
    productCode: "",
    jobNo: "",
    customer: "",
    hourlyTarget: 0,
    cycleTime: 0,
    itemWeight: "",
    availableCavities: 0,
    usingCavities:0,
    planningQty: 1,
    isDoubleBag: false,
    isCardboardRequired: false,
    isSecondBagRequired: false,
    bagType: "",
    bagSize: {},
    polytheneCode: "",
    secondBagSize: {},
    polytheneCodeSecond: "",
    cardboardSize: {},
    cardboardCode: "",
    itemsPerPacket: 0,
    isLabelRequired: false,
    labelName: {},
    labelCode: "",
    materialName: "",
    masterbatch: "",
    status: "NOT ACTIVE",
    totalhours: 1,
    proceedQty: 0,
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
    } else if (type == "bagType") {
      setData({ ...data, bagType: value });
    } else if (type == "bagSize") {
      setData({ ...data, bagSize: polySize[value] });
    } else if (type == "polytheneCode") {
      setData({ ...data, polytheneCode: value });
    } else if (type == "secondBagSize") {
      setData({ ...data, secondBagSize: polySize[value] });
    } else if (type == "polytheneCodeSecond") {
      setData({ ...data, polytheneCodeSecond: value });
    } else if (type == "cardboardSize") {
      setData({ ...data, cardboardSize: cardboardSize[value] });
    } else if (type == "cardboardCode") {
      setData({ ...data, cardboardCode: value });
    } else if (type == "itemsPerPacket") {
      setData({ ...data, itemsPerPacket: value });
    } else if (type == "labelName") {
      setData({ ...data, labelName: label[value] });
    } else if (type == "labelCode") {
      setData({ ...data, labelCode: value });
    } else if (type == "materialName") {
      setData({ ...data, materialName: value });
    } else if (type == "masterbatch") {
      setData({ ...data, masterbatch: value });
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  const [polySize, setPolySize] = useState([]);
  const [cardboardSize, setCardboardSize] = useState([]);
  const [label, setLabel] = useState([]);
  const [material, setMaterial] = useState([]);
  const [masterbatch, setMasterbatch] = useState([]);

  const fetchPackingMaterial = async () => {
    setIsLoading(true);
    const response = await getMaterialData();

    await setPolySize(response.data.data[0].Polythene);
    await setCardboardSize(response.data.data[0].Cardboard);
    await setLabel(response.data.data[0].Label);
    await setMaterial(response.data.data[0].RawMaterial);
    await setMasterbatch(response.data.data[0].MasterBatch);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchPackingMaterial();
  }, []);

  const checkEmptyFeilds = async () => {
    for (const [key, value] of Object.entries(data)) {
      if (
        key == "machineNo" ||
        key == "productName" ||
        key == "hourlyTarget" ||
        key == "cycleTime" ||
        key == "availableCavities" ||
        key == "usingCavities"
      ) {
        if (value == "" || value == undefined || value == null || value == 0) {
          await setMessages([
            ...messages,
            {
              status: "error",
              message: "Please fill out all required feilds.",
            },
          ]);
          setIsLoading(false);
          return false;
        } else {
          continue;
        }
      } else {
        return true;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    setSubmitted(true);
    setIsLoading(true);
   const validate = await checkEmptyFeilds()
    if (validate) {
      const response = await addProduct(data);
      setIsLoading(false);
      if (response.status == "success") {
        navigate(`/dashboard/view/${response.data._id}`);
      } else {
        setMessages([...messages, response]);
      }
    }
  };

  const [isDoubleBag, setIsDoubleBag] = useState(false);
  const [showSecondBag, setShowSecondBag] = useState(false);
  const [showCardboard, setShowCardboard] = useState(false);
  const [showLabel, setShowLabel] = useState(false);

  const handleCheck = async (value, type) => {
    if (type == "doubleBag") {
      await setData({ ...data, isDoubleBag: value.target.checked });
      setIsDoubleBag(!isDoubleBag);
    } else if (type == "cardboard") {
      await setData({ ...data, isCardboardRequired: value.target.checked });
      setShowCardboard(!showCardboard);
    } else if (type == "secondBag") {
      await setData({ ...data, isSecondBagRequired: value.target.checked });
      setShowSecondBag(!showSecondBag);
    } else if (type == "label") {
      await setData({ ...data, isLabelRequired: value.target.checked });
      setShowLabel(!showLabel);
    }
  };

  useEffect(() => {
    setIsDoubleBag(data.isDoubleBag);
    setShowSecondBag(data.isSecondBagRequired);
    setShowCardboard(data.isCardboardRequired);
    setShowLabel(data.isLabelRequired);
  }, []);

  return (
    <React.Fragment>
      {isLoading ? <MiniLoader /> : ""}
      {messages?.map((ele, index) => {
        return (
          <MessageBox
            key={index}
            message={ele.message}
            className={ele.status}
          />
        );
      })}
      <div className="add-product-container">
        <div className="head">
          Add New Production
          <span className="line"></span>
        </div>
        <div className="section-head">General Details</div>
        <div className="inputs-container">
          <div className="input-container">
            <div className="input-label">
              {" "}
              Machine No <span style={{ color: "var(--red)" }}>*</span>{" "}
            </div>
            <select
              name="machine"
              value={data.machineNo}
              onChange={(e) => handleChange(e.target.value, "machineNo")}
              className={
                submitted ? (data.machineNo == "" ? "red-border" : "") : ""
              }
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
            <div className="input-label">
              {" "}
              Product Name <span style={{ color: "var(--red)" }}>*</span>{" "}
            </div>
            <input
              type="text"
              placeholder="Product Name"
              value={data.productName}
              className={
                submitted ? (data.productName == "" ? "red-border" : "") : ""
              }
              onChange={(e) => handleChange(e.target.value, "productName")}
            />
          </div>
          <div className="input-container">
            <div className="input-label"> Product Code </div>
            <input
              type="text"
              placeholder="Product Code"
              // className="red-border"
              value={data.productCode}
              onChange={(e) => handleChange(e.target.value, "productCode")}
            />
          </div>
          <div className="input-container">
            <div className="input-label"> Job No </div>
            <input
              type="number"
              placeholder="Job No"
              value={data.jobNo}
              onChange={(e) => handleChange(e.target.value, "jobNo")}
            />
          </div>
          <div className="input-container">
            <div className="input-label"> Customer </div>
            <input
              type="text"
              placeholder="Customer"
              value={data.customer}
              onChange={(e) => handleChange(e.target.value, "customer")}
            />
          </div>
          <div className="input-container">
            <div className="input-label">
              {" "}
              Hourly Target <span style={{ color: "var(--red)" }}>*</span>
            </div>
            <input
              type="number"
              placeholder="Hourly Target"
              value={data.hourlyTarget}
              className={
                submitted ? (data.hourlyTarget == "" ? "red-border" : "") : ""
              }
              onChange={(e) => handleChange(e.target.value, "hourlyTarget")}
              required
            />
          </div>
          <div className="input-container">
            <div className="input-label">
              {" "}
              Cycle Time <span style={{ color: "var(--red)" }}>*</span>{" "}
            </div>
            <input
              type="number"
              placeholder="Cycle Time"
              value={data.cycleTime}
              className={
                submitted ? (data.cycleTime == "" ? "red-border" : "") : ""
              }
              onChange={(e) => handleChange(e.target.value, "cycleTime")}
            />
          </div>
          <div className="input-container">
            <div className="input-label"> Item Weight </div>
            <input
              type="number"
              placeholder="Item Weight"
              value={data.itemWeight}
              onChange={(e) => handleChange(e.target.value, "itemWeight")}
            />
          </div>
          <div className="input-container">
            <div className="input-label">
              {" "}
              Available No of cavities{" "}
              <span style={{ color: "var(--red)" }}>*</span>{" "}
            </div>
            <input
              type="number"
              placeholder="Standard No of cavities"
              value={data.availableCavities}
              className={
                submitted
                  ? data.availableCavities == ""
                    ? "red-border"
                    : ""
                  : ""
              }
              onChange={(e) =>
                handleChange(e.target.value, "availableCavities")
              }
            />
          </div>
          <div className="input-container">
            <div className="input-label">
              {" "}
              Using No of cavities{" "}
              <span style={{ color: "var(--red)" }}>*</span>
            </div>
            <input
              type="number"
              placeholder="Using No of cavities"
              value={data.usingCavities}
              className={
                submitted ? (data.usingCavities == "" ? "red-border" : "") : ""
              }
              onChange={(e) => handleChange(e.target.value, "usingCavities")}
            />
          </div>
          <div className="input-container">
            <div className="input-label"> Planning Qty </div>
            <input
              type="number"
              placeholder=" Planning Qty"
              value={data.planningQty}
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
                  value={data.isDoubleBag}
                  onChange={(e) => handleCheck(e, "doubleBag")}
                  checked={data.isDoubleBag}
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
                  value={data.isCardboardRequired}
                  onChange={(e) => handleCheck(e, "cardboard")}
                  checked={data.isCardboardRequired}
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
                  value={data.isSecondBagRequired}
                  onChange={(e) => handleCheck(e, "secondBag")}
                  checked={data.isSecondBagRequired}
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
              value={data.bagType}
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
              // value={data.bagSize}
              onChange={(e) => handleChange(e.target.value, "bagSize")}
            >
              <option value="">Bag Size</option>
              {polySize?.map((ele, index) => {
                return (
                  <option key={index} value={index}>
                    {ele.Size}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="input-container">
            <div className="input-label"> Items per Packet </div>
            <input
              type="number"
              placeholder="Items per Packet"
              value={data.itemsPerPacket}
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
                  // value={data.secondBagSize}
                  onChange={(e) =>
                    handleChange(e.target.value, "secondBagSize")
                  }
                >
                  <option value="">Second Bag Size</option>
                  {polySize?.map((ele, index) => {
                    return (
                      <option key={index} value={index}>
                        {ele.Size}
                      </option>
                    );
                  })}
                </select>
              </div>{" "}
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
                  // value={data.cardboardSize}
                  onChange={(e) =>
                    handleChange(e.target.value, "cardboardSize")
                  }
                >
                  <option value="">Cardboard Size</option>
                  {cardboardSize?.map((ele, index) => {
                    return (
                      <option key={index} value={index}>
                        {ele.Size}
                      </option>
                    );
                  })}
                </select>
              </div>
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
                  value={data.isLabelRequired}
                  onChange={(e) => handleCheck(e, "label")}
                  checked={data.isLabelRequired}
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
          {/* <div className="input-container">
            <div className="input-label">Material Name </div>
            <input
              type="text"
              placeholder="Material Name"
              value={data.materialName}
              onChange={(e) => handleChange(e.target.value, "materialName")}
            />
          </div> */}
          <div className="input-container">
            <div className="input-label"> Material Name </div>
            <select
              value={data.materialName}
              onChange={(e) => handleChange(e.target.value, "materialName")}
            >
              <option value="">Material</option>
              {material?.map((ele, index) => {
                return (
                  <option key={index} value={ele.MaterialName}>
                    {ele.MaterialName}
                  </option>
                );
              })}
            </select>
          </div>
          {/* <div className="input-container">
            <div className="input-label">Masterbatch </div>
            <input
              type="text"
              placeholder="Masterbatch"
              value={data.masterbatch}
              onChange={(e) => handleChange(e.target.value, "masterbatch")}
            />
          </div> */}
          <div className="input-container">
            <div className="input-label">Masterbatch </div>
            <select
              value={data.masterbatch}
              onChange={(e) => handleChange(e.target.value, "masterbatch")}
            >
              <option value="">Masterbatch</option>
              {masterbatch?.map((ele, index) => {
                return (
                  <option key={index} value={ele.MasterBatchName}>
                    {ele.MasterBatchName}
                  </option>
                );
              })}
            </select>
          </div>
          {showLabel ? (
            <>
              {/* <div className="input-container">
                <div className="input-label">Label </div>
                <input
                  type="text"
                  placeholder="Label Name"
                  value={data.labelName}
                  onChange={(e) => handleChange(e.target.value, "labelName")}
                />
              </div> */}

              <div className="input-container">
                <div className="input-label">Label </div>
                <select
                  // value={data.masterbatch}
                  onChange={(e) => handleChange(e.target.value, "labelName")}
                >
                  <option value="">Label</option>
                  {label?.map((ele, index) => {
                    return (
                      <option key={index} value={index}>
                        {ele.LabelName}
                      </option>
                    );
                  })}
                </select>
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
