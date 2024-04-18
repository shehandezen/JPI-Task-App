import React, { useState } from "react";
import "../css/componentStyles/passwordmodal.css";
import { deleteProduction, updateProductionReport } from "../app.service";
import { useParams } from "react-router-dom";

const DeleteModal = ({ index, setIndex, dMachine, setViewModal , setIsloading, productionreport }) => {
  const {id} = useParams()
  const [reason, setReason] = useState('')
  const handleChange = (e) => {
    setReason(e.target.value)
  };
  const deleteMachine = async(e) => {
    setIsloading(true)
    console.log(index, productionreport.Machines)
    if(reason != ''){
      const machinesCopy = productionreport.Machines
      machinesCopy[index].status = reason
      const deleteMachine = await updateProductionReport(id, {...productionreport, Machines: machinesCopy} )
      console.log(deleteMachine)
      if(deleteMachine.status == 200){
        const deleteProductionData = await deleteProduction(machinesCopy[index].data)
        delete machinesCopy[index].data
        if(deleteProductionData.status == 204){
           setIndex(null)
        setViewModal(false)
        }
       
      }
    }
    setIsloading(false)
    
  };
  return (
    <React.Fragment>
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