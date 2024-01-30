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

  const [polySize, setPolySize] = useState([
    "18x30",
    "20x32",
    "24x54",
    "16x37",
  ]);

  const [isDoubleBag, setIsDoubleBag] = useState(false);
  const [showSecondBag, setShowSecondBag] = useState(false);
  const [showCardboard, setShowCardboard] = useState(false);
  const [showLabel, setShowLabel] = useState(false);

  const handleCheck = (value, type) => {
    console.log(value, type);
    if (type == "doubleBag") {
      setIsDoubleBag(!isDoubleBag);
    } else if (type == "cardboard") {
      setShowCardboard(!showCardboard);
    } else if (type == "secondBag") {
      setShowSecondBag(!showSecondBag);
    } else if (type == "label") {
      setShowLabel(!showLabel);
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
            <select name="bag">
              <option value="">Bag type</option>
              <option value="">Cotton bag</option>
              <option value="">Polythene bag</option>
            </select>
          </div>
          <div className="input-container">
            <div className="input-label"> Bag Size </div>
            <select name="bagSize">
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
            <input type="number" placeholder=" Polythene Code" />
          </div>
          <div className="input-container">
            <div className="input-label"> Items per Packet </div>
            <input type="number" placeholder="Items per Packet" />
          </div>
          {showSecondBag ? (
            <>
              {" "}
              <div className="input-container">
                <div className="input-label"> Second bag Size </div>
                <select name="secondBag">
                  <option value="">Second Bag Size</option>
                  <option value="">20x32</option>
                </select>
              </div>{" "}
              <div className="input-container">
                <div className="input-label"> Polythene Code (second) </div>
                <input type="number" placeholder=" Polythene Code (second)" />
              </div>
            </>
          ) : (
            ""
          )}

          {showCardboard ? (
            <>
              <div className="input-container">
                <div className="input-label"> Cardboard Size </div>
                <select name="cardboard">
                  <option value="">Cardboard Size</option>
                  <option value="">40mmx35mmx20mm</option>
                </select>
              </div>
              <div className="input-container">
                <div className="input-label">Cardboard Code </div>
                <input type="number" placeholder="Cardboard Code" />
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
            <input type="number" placeholder="Material Name" />
          </div>
          <div className="input-container">
            <div className="input-label">Masterbatch </div>
            <input type="number" placeholder="Masterbatch" />
          </div>
          {showLabel ? (
            <>
              <div className="input-container">
                <div className="input-label">Label Name</div>
                <input type="number" placeholder="Label Name" />
              </div>
              <div className="input-container">
                <div className="input-label">Label Code </div>
                <input type="number" placeholder="Label Code" />
              </div>
            </>
          ) : (
            ""
          )}
        </div>
        <div className=" buttons">
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
