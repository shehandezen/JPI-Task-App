import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faPercent, faPencil } from "@fortawesome/free-solid-svg-icons";
import "../css/componentStyles/product.css";
import { Link, useParams } from "react-router-dom";
import { getMouldChangeData } from "../app.service";

const MouldChange = () => {
  const tag = <FontAwesomeIcon icon={faTag} />;
  const percent = <FontAwesomeIcon icon={faPercent} />;
  const pencil = <FontAwesomeIcon icon={faPencil} />;
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState({});
  const fetchData = async () => {
    setIsLoading(true);
    const response = await getMouldChangeData(id);
    await setData(response.data.data);
    console.log(response.data.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <div className="product-container">
        <div className="title">
          {data.MachineNo}
          <div className="line"></div>
        </div>
        <div className="info-container">
          <div className="info-line">
            <div className="info-key">
              {" "}
              <div className="icon">{tag}</div> Date :{" "}
            </div>
            <div className="info-value">
              {data.Date != "" ? data.Date : "N/A"}
            </div>
          </div>
          <div className="info-line">
            <div className="info-key">
              {" "}
              <div className="icon">{tag}</div> Unload Mould :{" "}
            </div>
            <div className="info-value">
              {data.PreviousProduct != "" ? data.PreviousProduct : "N/A"}
            </div>
          </div>
          <div className="info-line">
            <div className="info-key">
              {" "}
              <div className="icon">{tag}</div> Load Mould :{" "}
            </div>
            <div className="info-value">
              {data.NextProduct != "" ? data.NextProduct : "N/A"}
            </div>
          </div>
          <div className="info-line">
            <div className="info-key">
              {" "}
              <div className="icon">{tag}</div> Planned Time :{" "}
            </div>
            <div className="info-value">
              {data.PlannedTime != "" ? data.PlannedTime : "N/A"}
            </div>
          </div>
          <div className="info-line">
            <div className="info-key">
              {" "}
              <div className="icon">{tag}</div> Start Time :{" "}
            </div>
            <div className="info-value">
              {data.StartTime != "" ? data.StartTime : "N/A"}
            </div>
          </div>
          <div className="info-line">
            <div className="info-key">
              {" "}
              <div className="icon">{tag}</div> End Time :{" "}
            </div>
            <div className="info-value">
              {data.EndTime != "" ? data.EndTime : "N/A"}
            </div>
          </div>
          <div className="info-line">
            <div className="info-key">
              {" "}
              <div className="icon">{tag}</div> Actual Time :{" "}
            </div>
            <div className="info-value">
              {data.ActualTime != "" ? data.ActualTime : "N/A"}
            </div>
          </div>
          <div className="info-line">
            <div className="info-key">
              {" "}
              <div className="icon">{tag}</div> Note :{" "}
            </div>
            <div className="info-value">
              {data.Note != "" ? data.Note : "N/A"}
            </div>
          </div>
        </div>
        <Link
          to={`/dashboard/mouldchange/update/${data._id}`}
          className="edit-data"
        >
          {pencil}
        </Link>
      </div>
    </React.Fragment>
  );
};

export default MouldChange;
