import React from "react";
import "../css/componentStyles/development.css";

const ProductionDetail = () => {
  return (
    <>
      <div className="dev-container">
        <img
          src="https://x2yfn4-3000.csb.app/development.webp"
          alt="developmet"
        />
        <div className="text">This Feature is under development.</div>
      </div>
    </>
  );
};

export default ProductionDetail;
