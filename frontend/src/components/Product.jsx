import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faPercent } from "@fortawesome/free-solid-svg-icons";
import "../css/componentStyles/product.css";

const Product = () => {
  const tag = <FontAwesomeIcon icon={faTag} />;
  const percent = <FontAwesomeIcon icon={faPercent} />;

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
            <div className="info-value">Bottle Lid</div>
          </div>
          <div className="info-line">
            <div className="info-key">
              {" "}
              <div className="icon">{tag}</div> Product Name :{" "}
            </div>
            <div className="info-value">Bottle Lid</div>
          </div>
          <div className="info-line">
            <div className="info-key">
              {" "}
              <div className="icon">{tag}</div> Product Name :{" "}
            </div>
            <div className="info-value">Bottle Lid</div>
          </div>
          <div className="info-line">
            <div className="info-key">
              {" "}
              <div className="icon">{tag}</div> Product Name :{" "}
            </div>
            <div className="info-value">Bottle Lid</div>
          </div>
          <div className="section-title"> Packaging Details</div>
          <div className="info-line">
            <div className="info-key">
              {" "}
              <div className="icon">{tag}</div> Product Name :{" "}
            </div>
            <div className="info-value">
              <div className="box">Bottle Lid</div>
            </div>
          </div>
          <div className="info-line">
            <div className="info-key">
              {" "}
              <div className="icon">{tag}</div> Product Name :{" "}
            </div>
            <div className="info-value">Bottle Lid</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Product;
