import React, { useRef, useState, useEffect } from "react";
import '../css/componentStyles/machinereport.css'
import { Link, useParams } from "react-router-dom";
import MiniLoader from "./MiniLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import DeleteModal from "./DeleteModal";
import { addProduction, getProductionReport, getProducts, updateProductionReport } from "../app.service";


const ProductionDetail = () => {

  const deleteIcon = <FontAwesomeIcon icon={faTrash} />;
  const [dMachine, setDMachine] = useState({})
  const [viewModal, setViewModal] = useState(false)
  const [index, setIndex] = useState(null)
  const [data, setData] = useState({})
  const { id } = useParams()

  const machines = [
    'IM 01',
    'IM 02',
    'IM 03',
    'IM 04',
    'IM 05',
    'IM 06',
    'IM 07',
    'IM 08',
    'IM 09',
    'IM 10',
    'IM 11',
    'IM 12',
    'IM 13',
    'IM 14',
    'IM 15',
    'IM 16',
    'IM 17',
    'IM 18',
    'IM 19',
    'IM 20',
    'IM 21',
    'IM 22',
    'IM 23',
    'IM 24',
    'IML 01',
    'IML 02',
    'IML 03',
    'IML 04',
    'IML 05',
    'IML 06',
    'BM 01',
    'BM 02',
    'BM 03',
    'BM 04',
    'BM 05',
    'BM 06',
    'BM 07',
    'BM 08',
    'BM 09',
    'BM 10',
    'IBM 01',
  ]



  const [isView, setIsView] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [newMachine, setNewMachine] = useState('')

  const handleChange = (value) => {
    setNewMachine(value)
  }



  const addNewMachine = async () => {
    if (isView) {
      if (newMachine == '') {
        setIsView(!isView)
      }
      if (newMachine != '') {
        let isExist = false
        const arrCopy = data.Machines
        for await (let machine of arrCopy) {
          let i = arrCopy.indexOf(machine)
          if (machine.machine == newMachine) {
            isExist = true
            arrCopy[i].status = "Running"
          }
        }
        let getcurrentproduct = await getProducts(`{"machineNo":"${newMachine}"}`)
        if (getcurrentproduct.status == 200) {
          let addProductionData = await addProduction({
            MachineNo: newMachine,
            Date: data.Date,
            Shift: data.Shift,
            Supervisor: data.Supervisor,
            Product: getcurrentproduct?.data?.data[0]?._id
          })

          if (addProductionData.status == 'success') {
            if (!isExist) {
              arrCopy.push({ machine: newMachine, status: 'Running', data: addProductionData.data?._id })
            }
            console.log(arrCopy)
            await updateData(arrCopy)
          }

        }
      }

    } else {
      setIsView(!isView)
    }


  }

  const deleteMachine = async (index, element) => {
    setDMachine(element)
    setViewModal(true)
    setIndex(index)
  }


  const updateData = async (updateData) => {
    setIsLoading(true)
    console.log(updateData)
    const updatedData = await updateProductionReport(id,{...data, Machines: updateData})
    console.log(updatedData)
    setIsLoading(false)
  }

  const select = useRef()
  const selectInput = useRef()


  useEffect(() => {
    if (isView) {
      select.current.style.width = '150px'
      select.current.style.visibility = 'visible'
      selectInput.current.style.zIndex = '100000'

    } else {
      select.current.style.width = '50px'
      select.current.style.visibility = 'hidden'
      selectInput.current.style.zIndex = '100'


    }
  }, [isView])





  const fetchData = async () => {
    setIsLoading(true)
    const fetchedData = await getProductionReport(id)
    console.log(fetchedData.data.data)
    setData(fetchedData.data.data)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])


  return (
    <React.Fragment>
      {isLoading ? <MiniLoader /> : ""}
      {viewModal ? (<DeleteModal index={index} setIndex={setIndex} dMachine={dMachine} setViewModal={setViewModal} setIsloading={setIsLoading} productionreport={data} />) : ''}
      <div className="report-container">
        <div className="title">
          Production
          <span className="line"></span>
        </div>
        <div className="tags-container">
          <div className="tag">{data.Date}</div>
          <div className="tag">{data.Shift}</div>
          <div className="tag">{data.Supervisor}</div>
          {data.Status == "Active" ? (<div className="tag" style={{ background: 'var(--red)' }}>Live</div>) : ''}
        </div>
        <div className="machine-cards">

          {data.Machines?.map((element, index) => {
            return (element.status == "Running" ? (<div key={index}>
              <span className="deleteIcon" onClick={() => deleteMachine(index, element)}>{deleteIcon}</span>
              <Link to={`machine/${element.data}`} className="machine-card"> {element.machine}
              </Link>
            </div>) : "")
          })}
        </div>
        <div className="add-new" onClick={() => addNewMachine()}>
          +
        </div>

        <div className="add-input-container" ref={select}>
          <select name="machine" ref={selectInput} onChange={(e) => handleChange(e.target.value)}><option value="">No</option>

            {
              machines.map((element, index) => {
                return (<option key={index} value={element} >{element}</option>)
              })
            }
          </select>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductionDetail;
