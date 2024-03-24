import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTag,
  faPercent,
  faPencil,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import "../css/componentStyles/product.css";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import {
  getMouldChangeData,
  updateMouldChangeData,
  updateProductData,
} from "../app.service";
import MiniLoader from "./MiniLoader";
import MessageBox from "./MessageBox";

const MouldChange = () => {
  const tag = <FontAwesomeIcon icon={faTag} />;
  const hand = <FontAwesomeIcon icon={faThumbsUp} />;
  const pencil = <FontAwesomeIcon icon={faPencil} />;
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  const [data, setData] = useState({});
  useEffect(() => {
    setTimeout(() => {
      setMessages([]);
    }, 7500);

    // clearInterval();
  }, [messages]);

  const fetchData = async () => {
    setIsLoading(true);
    const response = await getMouldChangeData(id);
    await setData(response.data.data);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const markDone = async () => {
    setIsLoading(true);
    const preProductResponse = await updateProductData(
      data.previousProduct._id,
      { status: "Done" }
    );

    if (preProductResponse.data.status == "error") {
      await setMessages([...messages, preProductResponse.data]);
    }
    const nextProductResponse = await updateProductData(data.nextProduct._id, {
      status: "Active",
    });

    if (nextProductResponse.status == "error") {
      await setMessages([...messages, nextProductResponse.data]);
    }

    const MouldChangeResponse = await updateMouldChangeData(id, {
      status: "Done",
    });

    if (MouldChangeResponse.status == "error") {
      await setMessages([...messages, MouldChangeResponse.data]);
    }

    if (MouldChangeResponse.status == "sucess") {
      await setMessages([
        ...messages,
        { status: "success", message: "The mould change succesfully done!" },
      ]);
      navigate("/dashboard/mouldchange/current");
    }
    setIsLoading(false);
  };

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
      <div className="product-container">
        <div className="title">
          {data.machineNo}
          <div className="line"></div>
        </div>
        <div className="info-container">
          <div className="info-line">
            <div className="info-key">
              {" "}
              <div className="icon">{tag}</div> Date :{" "}
            </div>
            <div className="info-value">
              {data.date != "" ? data.date : "N/A"}
            </div>
          </div>
          <div className="info-line">
            <div className="info-key">
              {" "}
              <div className="icon">{tag}</div> Unload Mould :{" "}
            </div>
            <div className="info-value">
              {data.previousProduct != ""
                ? data.previousProduct?.productName
                : "N/A"}
            </div>
          </div>
          <div className="info-line">
            <div className="info-key">
              {" "}
              <div className="icon">{tag}</div> Load Mould :{" "}
            </div>
            <div className="info-value">
              {data.nextProduct != "" ? data.nextProduct?.productName : "N/A"}
            </div>
          </div>
          <div className="info-line">
            <div className="info-key">
              {" "}
              <div className="icon">{tag}</div> Planned Time :{" "}
            </div>
            <div className="info-value">
              {data.plannedTime != "" ? data.plannedTime : "N/A"}
            </div>
          </div>
          <div className="info-line">
            <div className="info-key">
              {" "}
              <div className="icon">{tag}</div> Start Time :{" "}
            </div>
            <div className="info-value">
              {data.startTime != "" ? data.startTime : "N/A"}
            </div>
          </div>
          <div className="info-line">
            <div className="info-key">
              {" "}
              <div className="icon">{tag}</div> End Time :{" "}
            </div>
            <div className="info-value">
              {data.endTime != "" ? data.endTime : "N/A"}
            </div>
          </div>
          <div className="info-line">
            <div className="info-key">
              {" "}
              <div className="icon">{tag}</div> Actual Time :{" "}
            </div>
            <div className="info-value">
              {data.actualTime != "" ? data.actualTime : "N/A"}
            </div>
          </div>
          <div className="info-line">
            <div className="info-key">
              {" "}
              <div className="icon">{tag}</div> Technicians :{" "}
            </div>
            <div className="info-value">
              {data.technician1 != ""
                ? `${data.technician1}, ${data.technician2}`
                : "N/A"}
            </div>
          </div>
          <div className="info-line">
            <div className="info-key">
              {" "}
              <div className="icon">{tag}</div> Note :{" "}
            </div>
            <div className="info-value">
              {data.note != "" ? data.note : "N/A"}
            </div>
          </div>
        </div>
        {data?.status != "Done" ? (
          <div className="buttons">
            <button className="mark-done" onClick={(e) => markDone(e)}>
              Mark as Done <span className="done-icon">{hand}</span>{" "}
            </button>
          </div>
        ) : (
          ""
        )}
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
