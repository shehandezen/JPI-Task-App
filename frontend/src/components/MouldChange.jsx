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
import { toast, ToastContainer, Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { toastConfig } from "../toastConfig";

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
    if (response.status == 200) {
      await setData(response.data.data);
      toast.success('The data is fetched!', toastConfig)
    } else if (response.status == 500) {
      toast.error('Backend error!', toastConfig)
    } else {
      toast.error('Something went wrong!', toastConfig)
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const markDone = async () => {
    setIsLoading(true);
    if (data.previousProduct != undefined) {
      const preProductResponse = await updateProductData(
        data.previousProduct?._id,
        { status: "Done" }
      );
      if (preProductResponse.data.status == "success") {
        const nextProductResponse = await updateProductData(data.nextProduct._id, {
          status: "Active",
        });

        if (nextProductResponse.status == "success") {
          const MouldChangeResponse = await updateMouldChangeData(id, {
            status: "Done",
          });

          if(MouldChangeResponse.status == "sucess"){
            toast.success("The mould change succesfully done!", toastConfig)
            navigate("/dashboard/mouldchange/current");
          }else if (MouldChangeResponse.status == "error") {
            toast.error(MouldChangeResponse.message, toastConfig)
          }else if(MouldChangeResponse.status == 500){
            toast.error("Backend error!", toastConfig)
          }else{
            toast.error("Something went wrong!", toastConfig)
          }

        } else if (nextProductResponse.status == "error") {
          toast.error(nextProductResponse.nextProductResponse.message, toastConfig)
        }else if(preProductResponse.status == 500){
          toast.error('Backend error!', toastConfig)
        }else {
          toast.error('Something went wrong!', toastConfig)
        }


      } else if (preProductResponse.data.status == "error") {
        // await setMessages([...messages, preProductResponse.data]);
        toast.error(preProductResponse.message, toastConfig)
      } else if (preProductResponse.status == 500) {
        toast.error('Backend error!', toastConfig)
      } else {
        toast.error('Something went wrong!', toastConfig)
      }
    }


    setIsLoading(false);
  };

  return (
    <React.Fragment>
      <ToastContainer />
      {isLoading ? <MiniLoader /> : ""}
      {/* {messages?.map((ele, index) => {
        return (
          <MessageBox
            key={index}
            message={ele.message}
            className={ele.status}
          />
        );
      })} */}
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
              {data.previousProduct != undefined
                ? data.previousProduct?.productName
                : "No Mould"}
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
                ? data.technician2 != ""
                  ? `${data.technician1}, ${data.technician2}`
                  : data.technician1
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
