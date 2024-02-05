import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faPercent } from "@fortawesome/free-solid-svg-icons";
import "../css/componentStyles/product.css";

const Product = () => {
  const tag = <FontAwesomeIcon icon={faTag} />;
  const percent = <FontAwesomeIcon icon={faPercent} />;

  const data = {
    machineNo: "IM 04",
    productName: "4L Ice lid ",
    productCode: "FG-IC-BTL-0973",
    jobNo: " 786565",
    customer: "Cargillse",
    hourlyTarget: "120",
    cycleTime: "22.5",
    itemWeight: "9.5",
    availableCavities: "4",
    usingCavities: "3",
    planningQty: "20000",
    isDoubleBag: true,
    isCardboardRequired: true,
    isSeconBagRequired: true,
    bagType: "Polythene bag",
    bagSize: "18x30",
    polytheneCode: "PM-PB-LDP-0013",
    secondBagSize: "18x30",
    polytheneCodeSecond: "PM-PB-LDP-0013",
    cardboardSize: "40mmx35mmx30mm",
    cardboardCode: "PM-CT-000-0017",
    isLabelRequired: true,
    labelName: "4L Ice lid cargillse vanilla",
    labelCode: "PM-LB-IML-0019",
    materialName: "CP 365",
    masterbatch: "210044545-2%",
  };

  const percentage = 55;
  const value1 = (percentage * ((250 - 20) / 2) * 3.14 * 2) / 100;
  const value2 =
    ((250 - 20) / 2) * 3.14 * 2 -
    (percentage * ((250 - 20) / 2) * 3.14 * 2) / 100;
  return (
    <React.Fragment>
      <div className="product-container">
        <div className="title">
          IM - 01
          <div className="line"></div>
        </div>
        <div className="progress-circle">
          <div className="circle">
            <div className="progress">
              <svg width="250" height="250" viewBox="0 0 250 250">
                <circle
                  class="bg"
                  cx="125"
                  cy="125"
                  r="115"
                  fill="none"
                  stroke="#10202b"
                  stroke-width="20"
                ></circle>
                <circle
                  class="fg"
                  cx="125"
                  cy="125"
                  r="115"
                  stroke-dasharray={`${value1} ${value2}`}
                  fill="none"
                  stroke="#12d39e"
                  stroke-width="20"
                  stroke-linecap="round"
                ></circle>
              </svg>
              <div className="percentage">
                75 <div className="percent-icon"> {percent}</div>
              </div>
              <div className="text">Effiency</div>
            </div>
          </div>
          <div className="circle">
            <div className="progress">
              <svg width="250" height="250" viewBox="0 0 250 250">
                <circle
                  class="bg"
                  cx="125"
                  cy="125"
                  r="115"
                  fill="none"
                  stroke="#10202b"
                  stroke-width="20"
                ></circle>
                <circle
                  class="fg"
                  cx="125"
                  cy="125"
                  r="115"
                  stroke-dasharray={`${value1} ${value2}`}
                  fill="none"
                  stroke="#12d39e"
                  stroke-width="20"
                  stroke-linecap="round"
                ></circle>
              </svg>
              <div className="percentage">
                75 <div className="percent-icon"> {percent}</div>
              </div>
              <div className="text">Effiency</div>
            </div>
          </div>
        </div>
        <div className="info-container">
          <div className="info-line">
            <div className="info-key">
              {" "}
              <div className="icon">{tag}</div> Product Name :{" "}
            </div>
            <div className="info-value">
              {data.productName != "" ? data.productName : "N/A"}
            </div>
          </div>
          <div className="info-line">
            <div className="info-key">
              {" "}
              <div className="icon">{tag}</div> Product Code :{" "}
            </div>
            <div className="info-value">
              {data.productCode != "" ? data.productCode : "N/A"}
            </div>
          </div>
          <div className="info-line">
            <div className="info-key">
              {" "}
              <div className="icon">{tag}</div> Job No :{" "}
            </div>
            <div className="info-value">
              {data.jobNo != "" ? data.jobNo : "N/A"}
            </div>
          </div>
          <div className="info-line">
            <div className="info-key">
              {" "}
              <div className="icon">{tag}</div> Customer :{" "}
            </div>
            <div className="info-value">
              {data.customer != "" ? data.customer : "N/A"}
            </div>
          </div>
          <div className="info-line">
            <div className="info-key">
              {" "}
              <div className="icon">{tag}</div> Product Name :{" "}
            </div>
            <div className="info-value">
              {data.hourlyTarget != "" ? data.hourlyTarget : "N/A"}
            </div>
          </div>

          <div className="info-line">
            <div className="info-key">
              {" "}
              <div className="icon">{tag}</div> Cycle Time :{" "}
            </div>
            <div className="info-value">
              {data.cycleTime != "" ? data.cycleTime : "N/A"}
            </div>
          </div>
          <div className="info-line">
            <div className="info-key">
              {" "}
              <div className="icon">{tag}</div> Item Weight :{" "}
            </div>
            <div className="info-value">
              {data.itemWeight != "" ? data.itemWeight : "N/A"}
            </div>
          </div>
          <div className="info-line">
            <div className="info-key">
              {" "}
              <div className="icon">{tag}</div> Available No of Cavities :{" "}
            </div>
            <div className="info-value">
              {data.availableCavities != "" ? data.availableCavities : "N/A"}
            </div>
          </div>
          <div className="info-line">
            <div className="info-key">
              {" "}
              <div className="icon">{tag}</div> Using No of Cavities :{" "}
            </div>
            <div className="info-value">
              {data.usingCavities != "" ? data.usingCavities : "N/A"}
            </div>
          </div>

          <div className="info-line">
            <div className="info-key">
              {" "}
              <div className="icon">{tag}</div> Planning Qty :{" "}
            </div>
            <div className="info-value">
              {data.planningQty != "" ? data.planningQty : "N/A"}
            </div>
          </div>

          <div className="section-title"> Packaging Details</div>
          <div className="info-line">
            <div className="info-key">
              {" "}
              <div className="icon">{tag}</div> Bag Type :{" "}
            </div>
            <div className="info-value">
              {data.bagType != "" ? data.bagType : "N/A"}
            </div>
          </div>
          <div className="info-line">
            <div className="info-key">
              {" "}
              <div className="icon">{tag}</div> Bag Size :{" "}
            </div>
            <div className="info-value">
              {data.bagSize != "" ? data.bagSize : "N/A"}
            </div>
          </div>
          {data.isSeconBagRequired ? (
            <>
              <div className="info-line">
                <div className="info-key">
                  {" "}
                  <div className="icon">{tag}</div> Second Bag Size :{" "}
                </div>
                <div className="info-value">
                  {data.secondBagSize != "" ? data.secondBagSize : "N/A"}
                </div>
              </div>
              <div className="info-line">
                <div className="info-key">
                  {" "}
                  <div className="icon">{tag}</div>
                  {" Polythene Code (second) : "}
                </div>
                <div className="info-value">
                  {data.polytheneCodeSecond != ""
                    ? data.polytheneCodeSecond
                    : "N/A"}
                </div>
              </div>
            </>
          ) : null}
          {data.isCardboardRequired ? (
            <>
              <div className="info-line">
                <div className="info-key">
                  {" "}
                  <div className="icon">{tag}</div> Cardboard Size :{" "}
                </div>
                <div className="info-value">
                  {data.cardboardSize != "" ? data.cardboardSize : "N/A"}
                </div>
              </div>
              <div className="info-line">
                <div className="info-key">
                  {" "}
                  <div className="icon">{tag}</div> Cardboard Code :{" "}
                </div>
                <div className="info-value">
                  {data.cardboardCode != "" ? data.cardboardCode : "N/A"}
                </div>
              </div>
            </>
          ) : null}
          <div className="section-title"> Packaging Details</div>

          <div className="info-line">
            <div className="info-key">
              {" "}
              <div className="icon">{tag}</div> Material Name :{" "}
            </div>
            <div className="info-value">
              {data.materialName != "" ? data.materialName : "N/A"}
            </div>
          </div>
          <div className="info-line">
            <div className="info-key">
              {" "}
              <div className="icon">{tag}</div> Masterbatch :{" "}
            </div>
            <div className="info-value">
              {data.masterbatch != "" ? data.masterbatch : "N/A"}
            </div>
          </div>
          {data.isLabelRequired ? (
            <>
              <div className="info-line">
                <div className="info-key">
                  {" "}
                  <div className="icon">{tag}</div> Label Name :{" "}
                </div>
                <div className="info-value">
                  {data.labelName != "" ? data.labelName : "N/A"}
                </div>
              </div>
              <div className="info-line">
                <div className="info-key">
                  {" "}
                  <div className="icon">{tag}</div> Label Code :{" "}
                </div>
                <div className="info-value">
                  {data.labelCode != "" ? data.labelCode : "N/A"}
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Product;
