import React, { useRef, useState, useEffect } from "react";
import '../css/componentStyles/machinereport.css'
import { Link } from "react-router-dom";
import MiniLoader from "./MiniLoader";


const ProductionDetail = () => {
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

  const [newMachine, setNewMachine] = useState({})

  const handleChange = (value) => {
    setNewMachine({ MachineNo: '' })
    for (let i in data.PlannedMachines) {
      if (data.PlannedMachines[i].MachineNo != value) {
        setNewMachine({ MachineNo: value })
      }

      
    }

  }
 


  const addNewMachine = async () => {
    if (isView) {
      if (newMachine != {}) {
        await updateData(newMachine)
      }

    } else {
      setIsView(!isView)
    }


  }

  const updateData = async (data) => {
    setIsLoading(true)
    console.log(data)
    await setInterval(() => {
      console.log('data fetching...')
      setIsLoading(false)
    }, 5000)

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

  const [data, setData] = useState({
    Date: 'dummydata',
    Shift: 'dummyData',
    Supervisor: 'dummyData',
    Live: true,
    PlannedMachines: [{
      MachineNo: 'IM 01'
    }]

  })



  const fetchData = async () => {
    setIsLoading(true)
    await setInterval(() => {
      console.log('data fetching...')
      setIsLoading(false)
    }, 5000)


  }

  useEffect(() => {
    fetchData()
  }, [])


  return (
    <React.Fragment>
      {isLoading ? <MiniLoader /> : ""}
      <div className="report-container">
        <div className="title">
          Production
          <span className="line"></span>
        </div>
        <div className="tags-container">
          <div className="tag">{data.Date}</div>
          <div className="tag">{data.Shift}</div>
          <div className="tag">{data.Supervisor}</div>
          {data.Live ? (<div className="tag" style={{ background: 'var(--red)' }}>Live</div>) : ''}
        </div>
        <div className="machine-cards">
          {/* <div className="machine-card">
            IM 01
          </div> */}
          {data.PlannedMachines.map((element, index) => {
            return (<Link to={`machine/${element.MachineNo}`} key={index} className="machine-card">
              {element.MachineNo}
            </Link>)
          })}
        </div>
        <div className="add-new" onClick={() => addNewMachine()}>
          +
        </div>

        <div className="add-input-container" ref={select}>
          <select name="machine" ref={selectInput} onChange={(e) => handleChange(e.target.value)}><option value="">No</option>
            {/* <option value="IM 01">IM 01</option> */}
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
