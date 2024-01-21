import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudArrowUp,
  faCircleXmark,
  faFile,
} from "@fortawesome/free-solid-svg-icons";
import "../css/componentStyles/upload.css";
import MiniLoader from "./MiniLoader";
import MessageBox from "./MessageBox";
import { uploadCsv } from "../app.service";

const Upload = () => {
  const cloudArrow = <FontAwesomeIcon icon={faCloudArrowUp} />;
  const circleX = <FontAwesomeIcon icon={faCircleXmark} />;
  const fileIcon = <FontAwesomeIcon icon={faFile} />;

  const [file, setFile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState([]);

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
  } = useDropzone({
    accept: {
      "text/csv": [".csv"],
    },
    maxFiles: 1,
  });

  useEffect(() => {
    console.log(acceptedFiles[0]);
    setFile({ file: acceptedFiles[0] });
  }, [acceptedFiles]);

  useEffect(() => {
    const messageTime = setTimeout(() => {
      setMessage([]);
    }, 3000);
    return () => {
      clearTimeout(messageTime);
    };
  }, [message]);

  const handleSubmit = async () => {
    setIsLoading(true);
    const response = await uploadCsv(file);
    console.log(response);

    setMessage([...message, response]);
    setIsLoading(false);
  };

  return (
    <React.Fragment>
      {isLoading ? <MiniLoader /> : ""}
      {message?.map(({ status, message }, index) => {
        return (
          <MessageBox
            style={{ transform: "translate(50%)" }}
            key={index}
            message={message}
            className={status}
          />
        );
      })}
      <div className="drop-area-container">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} name="file" />
          {isDragActive ? (
            isDragReject ? (
              <div className="drop-area reject">
                <div className="upload-icon">{circleX}</div>
                <p>Remember you can only upload .csv files</p>
              </div>
            ) : (
              <div className="drop-area drag-active">
                <div className="upload-icon">{cloudArrow}</div>
                <p>Drop the files here ...</p>
              </div>
            )
          ) : (
            <div className="drop-area">
              {acceptedFiles.length == 1 ? (
                <>
                  <div className="upload-icon">{fileIcon}</div>
                  <p>{`You have selected ${acceptedFiles[0].name} file.`}</p>
                </>
              ) : (
                <>
                  <div className="upload-icon">{cloudArrow}</div>
                  <p>Drag 'n' drop csv file here, or click to select files</p>
                </>
              )}
            </div>
          )}
          {}
        </div>
        <div className="span-text"> * Only .csv files will be accepted. </div>
        <div className="span-text"> * You can upload one file at a time. </div>
        <div className="span-text">
          {" "}
          * To upload this file, Click the upload button below.
        </div>
        <button className="upload-btn" onClick={() => handleSubmit()}>
          Upload
        </button>
      </div>
    </React.Fragment>
  );
};

export default Upload;
