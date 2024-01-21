import React from "react";
import "../css/componentStyles/passwordmodal.css";

const PasswordModal = ({ setData, data, handleSubmit, setViewModal }) => {
  const handleChange = (e) => {
    setData({ ...data, Password: e.target.value });
  };
  return (
    <React.Fragment>
      <div className="content-wrapper">
        <div className="modal-box">
          <div className="modal-message">
            Please, enter password to continue.
          </div>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => handleChange(e)}
          />
          <div className="buttons">
            <button
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Continue
            </button>
            <button
              style={{ background: "var(--red)" }}
              onClick={() => setViewModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PasswordModal;
