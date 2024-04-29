import React, { useRef, useState, useEffect } from "react";
import '../css/componentStyles/machinereport.css'
import { Link, useNavigate, useParams } from "react-router-dom";
import MiniLoader from "./MiniLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import DeleteModal from "./DeleteModal";
import { addChartData, addProduction, addReport, getChartData, getProductionReport, getProducts, getReports, updateChartData, updateProductionReport, updateReport } from "../app.service";
import { toast, ToastContainer, Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { toastConfig } from "../toastConfig";


const ProductionDetail = () => {

  const deleteIcon = <FontAwesomeIcon icon={faTrash} />;
  const [dMachine, setDMachine] = useState({})
  const [viewModal, setViewModal] = useState(false)
  const [index, setIndex] = useState(null)
  const [data, setData] = useState({})
  const [allClosed, setAllClosed] = useState(false)
  const [reports, setReports] = useState()
  const [report, setReport] = useState()
  const { id } = useParams()
  const navigate = useNavigate()

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
    'IML 07',
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
      } else {
        let isUpdate = false

        const arrCopy = data.Machines
        for await (let machine of arrCopy) {
          let i = arrCopy.indexOf(machine)
          if (machine.machine == newMachine) {
            if (!(machine.status == "Running")) {
              isUpdate = true
              arrCopy[i].status = "Running"
              setIndex(i)
            }
          }
        }
        let getcurrentproduct = await getProducts(`{"machineNo":"${newMachine}"}`)
        console.log(getcurrentproduct)

        if (getcurrentproduct.status == 200) {
          let addProductionData = await addProduction({
            MachineNo: newMachine,
            Date: data.Date,
            Shift: data.Shift,
            Supervisor: data.Supervisor,
            Product: getcurrentproduct?.data?.data[0]?._id,
            StartTime: '',
            Status: 'Active',
            EndTime: '',
            Counter: [{
              Time: '07:30',
              Counter: '',
              Damage: {
                Material: '',
                Machine: '',
                Clear: ''
              }
            },
            {
              Time: '08:00',
              Counter: '',
              Damage: {
                Material: '',
                Machine: '',
                Clear: ''
              },
            },
            {
              Time: '09:00',
              Counter: '',
              Damage: {
                Material: '',
                Machine: '',
                Clear: ''
              }
            },
            {
              Time: '10:00',
              Counter: '',
              Damage: {
                Material: '',
                Machine: '',
                Clear: ''
              }
            },
            {
              Time: '11:00',
              Counter: '',
              Damage: {
                Material: '',
                Machine: '',
                Clear: ''
              }
            },
            {
              Time: '12:00',
              Counter: '',
              Damage: {
                Material: '',
                Machine: '',
                Clear: ''
              }
            },
            {
              Time: '01:00',
              Counter: '',
              Damage: {
                Material: '',
                Machine: '',
                Clear: ''
              }
            },
            {
              Time: '02:00',
              Counter: '',
              Damage: {
                Material: '',
                Machine: '',
                Clear: ''
              }
            },
            {
              Time: '03:00',
              Counter: '',
              Damage: {
                Material: '',
                Machine: '',
                Clear: ''
              }
            },
            {
              Time: '04:00',
              Counter: '',
              Damage: {
                Material: '',
                Machine: '',
                Clear: ''
              }
            },
            {
              Time: '05:00',
              Counter: '',
              Damage: {
                Material: '',
                Machine: '',
                Clear: ''
              }
            },
            {
              Time: '06:00',
              Counter: '',
              Damage: {
                Material: '',
                Machine: '',
                Clear: ''
              }
            },
            {
              Time: '07:00',
              Counter: '',
              Damage: {
                Material: '',
                Machine: '',
                Clear: ''
              }
            },
            {
              Time: '07:30',
              Counter: '',
              Damage: {
                Material: '',
                Machine: '',
                Clear: ''
              }
            },

            ],
            NoOfPackets: '',
            DownTimes: [{
              From: '00:00',
              To: '00:00',
              Reason: ''
            },],
            EngineeringParameters: {
              PreHeaterTemp: {
                Specified: '',
                Actual: ''
              },
              ZoneTemp: [
                {
                  Zone: 'Zone 01',
                  Specified: '',
                  Actual: ''
                },
                {
                  Zone: 'Zone 02',
                  Specified: '',
                  Actual: ''
                },
                {
                  Zone: 'Zone 03',
                  Specified: '',
                  Actual: ''
                },
                {
                  Zone: 'Zone 04',
                  Specified: '',
                  Actual: ''
                },
              ],
              Parameters: [
                {
                  Parameter: 'Holding Pressure',
                  Specified: '',
                  Actual: ''
                },
                {
                  Parameter: 'Back Pressure',
                  Specified: '',
                  Actual: ''
                },
                {
                  Parameter: 'Injection Time',
                  Specified: '',
                  Actual: ''
                },
                {
                  Parameter: 'Cooling Time',
                  Specified: '',
                  Actual: ''
                },
                {
                  Parameter: 'Chilled Water Temp',
                  Specified: '',
                  Actual: ''
                },
                {
                  Parameter: 'Oil Temp',
                  Specified: '',
                  Actual: ''
                },]

            }
          })
          console.log(addProductionData)

          if (addProductionData.status == 'success') {
            arrCopy.push({ machine: newMachine, status: 'Running', data: addProductionData.data?._id })
            await updateData(arrCopy)

          } else if (addProductionData.status == 500) {
            toast.error('Backend error!', toastConfig)
          } else {
            toast.error('Something went wrong!', toastConfig)
          }

        } else if (getcurrentproduct.status == 500) {
          toast.error('Backend error!', toastConfig)
        } else {
          toast.error('Something went wrong!', toastConfig)
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
    const updatedData = await updateProductionReport(id, { ...data, Machines: updateData })
    if (updatedData.status == 200) {
      console.log('added')
      console.log(updateData)
      setData(pre=> ({...pre, Machines:updateData}))
      toast.success('New machine added!', toastConfig)
      setIsView(false)
    } else if (updatedData.status == 'error') {
      toast.error(updatedData.message, toastConfig)
    } else {
      toast.error('Something went wrong!', toastConfig)
    }
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

    if (fetchedData.status == 200) {
      setData(fetchedData.data.data)
      console.log(data)
      toast.success('The data is fetched!', toastConfig)
    } else {
      toast.error('Something went wrong!', toastConfig)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])


  const finishFullReport = async () => {
    setIsLoading(true)
    const IM = {
      efficiency: [],
      hoursUtilization: []
    }
    const IML = {
      efficiency: [],
      hoursUtilization: []
    }

    const BM = {
      efficiency: [],
      hoursUtilization: []
    }

    const IBM = {
      efficiency: [],
      hoursUtilization: []
    }


    const date = new Date(data.Date)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const getexistSummary = await getReports(`{"Date":{"Year":"${year}","Month":"${month}","Day":"${day}","Shift":"${data.Shift}"}}`)
    if (getexistSummary.status == 200) {
      if (getexistSummary.data?.data.length != 0) {
        setReports(getexistSummary.data.data[0].Reports)
        setReport(getexistSummary.data.data[0])
      } else {
        const reportObject = {
          Date: {
            Year: year,
            Month: month,
            Day: day,
            Shift: data.Shift
          },
          Supervisor: data.Supervisor,
          Summary: {
            IMEfficiency: 0,
            BMEfficiency: 0,
            IMLEfficiency: 0,
            IBMEfficiency: 0
          },
          Reports: []
        }


        const createReport = await addReport(reportObject)
        if (createReport.status == 200 || createReport.status == 'success') {
          setReports(createReport.data.data?.Reports)
          setReport(createReport.data.data)
          toast('New report created!', toastConfig)
        } else {
          toast.error('Something went wrong! ', toastConfig)
        }
      }

    } else {
      toast.error('Something went wrong!', toastConfig)
    }

    let arr = []

    for await (let report of data.Machines) {
      if (report.status == 'Running') {
        arr.push(report.data?.Status)
        console.log(arr)
        if (report.data?.Status == 'Closed') {
          await setAllClosed(true)
          console.log( await allClosed)
        } else {
          console.log(report.data?.Status)
          setAllClosed(false)
          break
        }
      } else {
        continue
      }

    }

    const filterArr = await arr.filter(value => value != 'Closed')
    console.log(filterArr)


    if (filterArr.length == 0) {
      if (reports != undefined) {

        for await (let report of reports) {
          if (report.Machine.includes('IML')) {
            IML.efficiency.push(report.Summary.Efficiency)
            IML.efficiency.push(report.Summary.ProductionHoursUtilization)
          } else if (report.Machine.includes('IM')) {
            IM.efficiency.push(report.Summary.Efficiency)
            IM.efficiency.push(report.Summary.ProductionHoursUtilization)
          } else if (report.Machine.includes('IBM')) {
            IBM.efficiency.push(report.Summary.Efficiency)
            IBM.efficiency.push(report.Summary.ProductionHoursUtilization)
          } else if (report.Machine.includes('BM')) {
            BM.efficiency.push(report.Summary.Efficiency)
            BM.efficiency.push(report.Summary.ProductionHoursUtilization)
          }
        }
        const efficiencyObject = {
          IMEfficiency: (IM.efficiency.reduce((a, c) => a + c, 0,)) / (IM.efficiency.length),
          BMEfficiency: (BM.efficiency.reduce((a, c) => a + c, 0,)) / (BM.efficiency.length),
          IMLEfficiency: (IML.efficiency.reduce((a, c) => a + c, 0,)) / (IML.efficiency.length),
          IBMEfficiency: (IBM.efficiency.reduce((a, c) => a + c, 0,)) / (IBM.efficiency.length)
        }


        const updatefullReport = await updateReport(report._id, { Summary: efficiencyObject })
        if (updatefullReport.status == 200) {
          const productionReportFinish = await updateProductionReport(data._id, { Status: 'Finished' })
          if (productionReportFinish.status == 200) {
            const chart = await getChartData(`{"Date":{"Year":"${year}","Month":"${month}"}}`)

            if (chart.data?.data.length == 0) {
              const createChart = await addChartData({
                Date: {
                  Year: year,
                  Month: month,
                },
                ProductionEfficiency: [{
                  Day: day,
                  Shift: data.Shift,
                  Efficiency: (IM.efficiency + BM.efficiency + IML.efficiency) / 3
                }],
                ProductionHoursUtilization: [{
                  Day: day,
                  Shift: data.Shift,
                  Utilization: ((IM.hoursUtilization + BM.hoursUtilization + IML.hoursUtilization) / 3)
                }]
              })

              if (createChart.status == 200) {
                toast.sucess('Chart data added!', toastConfig)
                navigate('/dashboard')
              } else {
                toast.error('Something went wrong !', toastConfig)
              }
            } else {
              const updateChart = await updateChartData(chart.data?.data[0]?._id, {
                ProductionEfficiency: [...chart.data?.data[0]?.ProductionEfficiency, {
                  Day: day,
                  Shift: data.Shift,
                  Efficiency: (IM.efficiency + BM.efficiency + IML.efficiency) / 3
                }],
                ProductionHoursUtilization: [...chart.data?.data[0]?.ProductionHoursUtilization, {
                  Day: day,
                  Shift: data.Shift,
                  Utilization: ((IM.hoursUtilization + BM.hoursUtilization + IML.hoursUtilization) / 3)
                }]
              })

              if (updateChart.status == 200) {
                navigate('/dashboard')

              } else {
                toast.error('Something went wrong !', toastConfig)
              }
            }

          } else {
            toast.error('Something went wrong !', toastConfig)
          }

          // navigate('/dashboard')
        } else {
          toast.error('Something went wrong !', toastConfig)
        }




      } else {
        toast.warning('Please, try again clicking on \n` Finish report ` button', toastConfig)
      }
    } else {
      toast.error('Please, close all exist reports!', toastConfig)
    }
    setIsLoading(false)
  }


  return (
    <React.Fragment>
      {isLoading ? <MiniLoader /> : ""}
      <ToastContainer />
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

              {element.data?.Status == 'Closed' ? (<span className="closed">Closed</span>) : (<span className="deleteIcon" onClick={() => deleteMachine(index, element)}>{deleteIcon}</span>)}
              <Link to={element.data?._id != undefined? `machine/${element.data?._id}` :`machine/${element.data}` } className="machine-card"> {element.machine}
              </Link>
            </div>) : "")
          })}
        </div>
        {data.Status == 'Active' ? (<>
          <div>
            <button className="finish-btn" onClick={() => finishFullReport()}>
              Finish Report
            </button>
          </div>
          <div className="add-new" onClick={() => addNewMachine()}>
            +
          </div>
        </>) : null}



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
