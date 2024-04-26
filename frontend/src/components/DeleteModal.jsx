import React, { useState } from "react";
import "../css/componentStyles/passwordmodal.css";
import { deleteProduction, updateProductionReport } from "../app.service";
import { useParams } from "react-router-dom";
import { toast, ToastContainer, Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { toastConfig } from "../toastConfig";

const DeleteModal = ({ index, setIndex, dMachine, setViewModal, setIsloading, productionreport }) => {
  const { id } = useParams()
  const [reason, setReason] = useState('')
  const handleChange = (e) => {
    setReason(e.target.value)
  };
  const deleteMachine = async (e) => {
    setIsloading(true)
    if (reason != '') {
      const machinesCopy = productionreport.Machines
      machinesCopy[index].status = reason
      const deleteMachine = await updateProductionReport(id, { ...productionreport, Machines: machinesCopy })
      if (deleteMachine.status == 200) {
        console.log(machinesCopy[index])
        if (machinesCopy[index].data == undefined) {
          toast.success('The machine is deleted!', toastConfig)
          setIndex(null)
          setViewModal(false)

        } else {
          const deleteProductionData = await deleteProduction(machinesCopy[index]?.data._id)
          // delete machinesCopy[index].data
          if (deleteProductionData.status == 204) {
            toast.success('The machine is deleted!', toastConfig)
          setIndex(null)
          setViewModal(false)
            
          } else if (deleteProductionData.status == 500) {
            toast.error('Backend error!', toastConfig)
          } else {
            toast.error('Something went wrong!', toastConfig)
          }
        }


      } else if (deleteMachine.status == 500) {
        toast.error('Backend error!', toastConfig)
      } else {
        toast.error('Something went wrong!', toastConfig)
      }
    } else {
      toast.error('Please, enter reason to delete the machine!', toastConfig)
    }
    setIsloading(false)

  };
  return (
    <React.Fragment>
      <ToastContainer />
      <div className="content-wrapper">
        <div className="modal-box">
          <div className="modal-message">
            {`Are you want remove ${dMachine.machine} ?`}
          </div>
          <input
            type="text"
            placeholder="Reason"
            onChange={(e) => handleChange(e)}
            required
          />

          <div className="buttons">
            <button
              style={{ background: "var(--red)" }}
              onClick={(e) => {
                deleteMachine(e);
              }}
            >
              Delete
            </button>
            <button
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

export default DeleteModal;