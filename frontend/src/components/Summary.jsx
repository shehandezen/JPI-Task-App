import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast, ToastContainer, Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { toastConfig } from "../toastConfig";
import { faCalendarDays, faPercent, faSun, faMoon, faXmark, faHandPointRight } from "@fortawesome/free-solid-svg-icons";
import "../css/summary.css";
import { getChartData, getReport, getReports } from '../app.service'
import MiniLoader from "./MiniLoader";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const Summary = () => {
  const calender = <FontAwesomeIcon icon={faCalendarDays} />;
  const percent = <FontAwesomeIcon icon={faPercent} />;
  const day = <FontAwesomeIcon icon={faSun} />;
  const night = <FontAwesomeIcon icon={faMoon} />;
  const x = <FontAwesomeIcon icon={faXmark} />;
  const pointer = <FontAwesomeIcon icon={faHandPointRight} />;
  const [selectModal, setSelectModal] = useState(false)
  const [machineModal, setMachineModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [shift, setShift] = useState('Day')
  const [machine, setMachine] = useState(0)
  const [chartData, setChartData] = useState({})
  const [dataPoints,setDataPoints] = useState([])

  const datasetKeyProvider=()=>{ 
    return btoa(Math.random()).substring(0,12)
} 


  const [days, setDays] = useState([])
  const [productionEfficiency, setProductionEfficiency] = useState([])
  const [productionHoursUtilization, setProductionHoursUtilization] = useState([])
  const [chartConfig, setChartConfig] = useState({
    labels: [],
    datasets: [
      {
        label: "Production Efficiency",
        id:datasetKeyProvider(),
        backgroundColor: "#12d39e",
        borderColor: "#12d39e",
        data: []
      },
      // {
      //   label: "Production Hour Utilization",
      //   id:datasetKeyProvider(),
      //   backgroundColor: "#fff",
      //   borderColor: "#fff",
      //   data: []
      // },
    ],
  })

  const [selectionData, setSelectionData] = useState({
    Date: {
      Year: '',
      Month: '',
      Day: '',
      Shift: ''
    }
  })
  const [dataObject, setDataObject] = useState()
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Augast',
    'September',
    'Octomber',
    'November',
    'December'
  ]
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const fetchChartData = async () => {
    setIsLoading(true)
    const chartdata = await getChartData(`{"Date":{"Year":"${year}","Month":"${month}"}}`)
    if (chartdata.status == 200) {
      setChartData({...chartdata.data?.data[0]})
      toast.success("Chat is updated!", toastConfig);
    } else if ((chartdata.status == 500)) {
      toast.error("Backend error!", toastConfig);
    } else {
      toast.error("Something went wrong!", toastConfig);
    }
    setIsLoading(false)
  }

  const updateChart = async () => {
    if (Object.keys(chartData).length != 0) {
      let arrOne = [...chartData.ProductionEfficiency]
      let arrTwo = [...chartData.ProductionHoursUtilization]
      for await (let i of arrOne) {
        setProductionEfficiency(pre => [...pre, i?.Efficiency])
      setDays(pre=>[ ...pre, `${i?.Day} ${months[month - 1]} ${i?.Shift}`])
      setDataPoints(pre=> [...pre,{ day:`${i?.Day} ${months[month - 1]} ${i?.Shift}`, data:{efficiency:i?.Efficiency,utilization:arrTwo[arrOne.indexOf(i)].Utilization}}])
      }
      for await (let i of arrTwo) {
        setProductionHoursUtilization(pre => [...pre, i?.Utilization])
      }
     

    } 
    // for await(let i of chartData?.ProductionEfficiency){
    //   setProductionEfficiency([...productionEfficiency, i?.Efficiency])
    // }
  }


  const fetchData = async () => {
    setIsLoading(true)
    const fetchdata = await getReports(`{}`)
    if (fetchdata.status == 200) {
      setDataObject(fetchdata.data.data[fetchdata.data.data.length - 1])
      toast.success("The latest report fetched!", toastConfig);
      setIsLoading(false)
    } else if ((fetchdata.status == 500)) {
      toast.error("Backend error!", toastConfig);
    } else {
      toast.error("Something went wrong!", toastConfig);
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchChartData()
    fetchData()

  }, [])

  useEffect(() => {
    updateChart()
    console.log(dataPoints)

  }, [chartData])

  useEffect(() => {
    setChartConfig(pre=> (
    {  ...pre, labels: days, datasets: [{...pre.datasets[0], data: productionEfficiency}]}
    ))
    console.log(productionEfficiency)
  }, [productionEfficiency])

  const handleChange = (e) => {
    console.log(e.target.value)
    const date = new Date(e.target.value)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    console.log(year)
    setSelectionData({
      Date: {
        Year: `${year}`,
        Month: `${month}`,
        Day: `${day}`,
        Shift: shift
      }
    })
  }

  const handleIndex = (value) => {
    setMachine(value)
    console.log(machine)
    setMachineModal(!machineModal)
  }

  const selectReport = async () => {
    setIsLoading(true)
    console.log(selectionData)
    const getReportData = await getReports(`{"Date":{"Year":"${selectionData.Date.Year}","Month":"${selectionData.Date.Month}","Day":"${selectionData.Date.Day}","Shift":"${selectionData.Date.Shift}"}}`)
    console.log(getReportData)
    if (getReportData.status == 200) {

      if (getReportData.data?.data.length != 0) {
        toast.success("The report data is fetched!", toastConfig);
        setDataObject(getReportData.data?.data[0])
      } else {
        toast.error('The report does not exist!', toastConfig)
      }

      setSelectModal(false)
    } else if ((getReportData.status == 500)) {
      toast.error("Backend error!", toastConfig);
    } else {
      toast.error("Something went wrong!", toastConfig);
    }

    setIsLoading(false)
  }


  const toggleSelectModal = () => {
    setSelectModal(!selectModal)
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Production',
        color: '#12d39e',
        font: {
          size: 25
        }
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Percentage',
          font: {
            size: 18
          }
        },
        grid: {
          color: 'rgba(255,255,255,0.2)'
        },
        ticks: {
          beginAtZero: true
        }

      },
      x: {
        title: {
          display: true,
          text: 'Days',
          font: {
            size: 18
          }
        },
        grid: {
          color: 'rgba(255,255,255,0.2)'
        }
      }
    }
  };





  const circularBar = (percentage, text) => {
    const value1 = (percentage * ((250 - 20) / 2) * 3.14 * 2) / 100;
    const value2 =
      ((250 - 20) / 2) * 3.14 * 2 -
      (percentage * ((250 - 20) / 2) * 3.14 * 2) / 100;

    return (
      <>
        <div className="percentage">
          {percentage} <div className="percent-icon"> {percent}</div>
        </div>
        <svg width="200" height="200" viewBox="0 0 250 250">
          <circle
            className="bg"
            cx="125"
            cy="125"
            r="115"
            fill="none"
            stroke="#182d3c"
            strokeWidth="20"
          ></circle>
          <circle
            className="fg"
            cx="125"
            cy="125"
            r="115"
            strokeDasharray={`${value1} ${value2}`}
            fill="none"
            stroke="#12d39e"
            strokeWidth="20"
            strokeLinecap="round"
          ></circle>
        </svg>
        <div className="percentage-title"> {text}</div>
      </>
    )
  }


  return (
    <React.Fragment>
      {isLoading ? <MiniLoader /> : null}
      <ToastContainer />
      {selectModal ? (<div className="selection-modal">
        <div className="modal-box">
          <p>Select Date and Shift for fetch the report that you need.</p>
          <input type="date" onChange={(e) => handleChange(e)} />
          <div className="icons">
            <div className={`day ${shift == 'Day' ? 'select-icon' : ''}`} onClick={() => setShift('Day')}>
              {day}
            </div>
            <div className={`night ${shift == 'Night' ? 'select-icon' : ''}`} onClick={() => setShift('Night')} >
              {night}
            </div>
          </div>
          <div className="btn-group">
            <button onClick={() => selectReport()}> OK</button>
            <button onClick={() => toggleSelectModal()}> CANCEL</button>
          </div>
        </div>
      </div>) : null}

      {machineModal ? (
        <div className="machine-modal">
          <div className="modal-box">
            <div className="close" onClick={() => setMachineModal(!machineModal)}>{x}</div>
            <div className="title"> {dataObject.Reports[machine].Machine}</div>
            <div className="percentage-section">
              <div className="percentage-circle">
                {circularBar(dataObject?.Reports[machine]?.Summary.Efficiency, 'Production Efficiency')}
              </div>
              <div className="percentage-circle">
                {circularBar(dataObject?.Reports[machine]?.Summary.ProductionHoursUtilization, 'Runtime Effectiveness')}
              </div>
            </div>
            <div className="detail-box">
              <div className="detail-title">Production Records</div>
              <div className="detail-group">
                <div className="detail-key">{pointer} Product : </div>
                <div className="detail-value"> {dataObject?.Reports[machine]?.Report?.Product?.productName}</div>
              </div>
              <div className="detail-group">
                <div className="detail-key">{pointer} Planned Qty : </div>
                <div className="detail-value"> {dataObject?.Reports[machine]?.Summary.PlannedQty}</div>
              </div>
              <div className="detail-group">
                <div className="detail-key">{pointer} Proceed Qty : </div>
                <div className="detail-value"> {dataObject?.Reports[machine]?.Summary.ProceedQty}</div>
              </div>
              <div className="detail-group">
                <div className="detail-key">{pointer} Material damages : </div>
                <div className="detail-value"> {dataObject?.Reports[machine]?.Summary.Damages.Material}</div>
              </div>
              <div className="detail-group">
                <div className="detail-key">{pointer} Machine Damages : </div>
                <div className="detail-value"> {dataObject?.Reports[machine]?.Summary.Damages.Machine}</div>
              </div>
              <div className="detail-group">
                <div className="detail-key">{pointer} Clear Damages : </div>
                <div className="detail-value"> {dataObject?.Reports[machine]?.Summary.Damages.Clear}</div>
              </div>
              <div className="detail-group">
                <div className="detail-key">{pointer} No of Packets : </div>
                <div className="detail-value"> {dataObject?.Reports[machine]?.Summary.NoOfPackets}</div>
              </div>
              <div className="detail-group">
                <div className="detail-key">{pointer} Planned Hours : </div>
                <div className="detail-value"> {dataObject?.Reports[machine]?.Summary.ProductionHours}</div>
              </div>
              <div className="detail-group">
                <div className="detail-key">{pointer} Utilized Hours : </div>
                <div className="detail-value"> {dataObject?.Reports[machine]?.Summary.UtilizedHours}</div>
              </div>
            </div>
            <div className="detail-box">
              <div className="detail-title">Engineering Parameters</div>
              <div className="eng-table">
                <table >
                  <thead>
                    <tr>
                      <td rowSpan={2}>Parameters</td>
                      <td rowSpan={2}>Pre Heater Temp </td>
                      <td colSpan={4}>Zone Temperature</td>
                      <td colSpan={2}>Pressure</td>
                      <td rowSpan={2}>Injection Time</td>
                      <td rowSpan={2}>Coolig Time</td>
                      <td rowSpan={2}>Chilled Water Temp</td>
                      <td rowSpan={2}>Oil Temp</td>
                    </tr>
                    <tr>
                      <td>Z1</td>
                      <td>Z2</td>
                      <td>Z3</td>
                      <td>Z4</td>
                      <td>Holding Pressure</td>
                      <td>back Pressure</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Specified</td>
                      <td>{dataObject.Reports[machine].Report.EngineeringParameters.PreHeaterTemp.Specified}</td>
                      <td>{dataObject.Reports[machine].Report.EngineeringParameters.ZoneTemp[0].Specified}</td>
                      <td>{dataObject.Reports[machine].Report.EngineeringParameters.ZoneTemp[1].Specified}</td>
                      <td>{dataObject.Reports[machine].Report.EngineeringParameters.ZoneTemp[2].Specified}</td>
                      <td>{dataObject.Reports[machine].Report.EngineeringParameters.ZoneTemp[3].Specified}</td>
                      <td>{dataObject.Reports[machine].Report.EngineeringParameters.Parameters[0].Specified}</td>
                      <td>{dataObject.Reports[machine].Report.EngineeringParameters.Parameters[1].Specified}</td>
                      <td>{dataObject.Reports[machine].Report.EngineeringParameters.Parameters[2].Specified}</td>
                      <td>{dataObject.Reports[machine].Report.EngineeringParameters.Parameters[3].Specified}</td>
                      <td>{dataObject.Reports[machine].Report.EngineeringParameters.Parameters[4].Specified}</td>
                      <td>{dataObject.Reports[machine].Report.EngineeringParameters.Parameters[5].Specified}</td>
                    </tr>
                    <tr>
                      <td>Acual</td>
                      <td>{dataObject.Reports[machine].Report.EngineeringParameters.PreHeaterTemp.Actual}</td>
                      <td>{dataObject.Reports[machine].Report.EngineeringParameters.ZoneTemp[0].Actual}</td>
                      <td>{dataObject.Reports[machine].Report.EngineeringParameters.ZoneTemp[1].Actual}</td>
                      <td>{dataObject.Reports[machine].Report.EngineeringParameters.ZoneTemp[2].Actual}</td>
                      <td>{dataObject.Reports[machine].Report.EngineeringParameters.ZoneTemp[3].Actual}</td>
                      <td>{dataObject.Reports[machine].Report.EngineeringParameters.Parameters[0].Actual}</td>
                      <td>{dataObject.Reports[machine].Report.EngineeringParameters.Parameters[1].Actual}</td>
                      <td>{dataObject.Reports[machine].Report.EngineeringParameters.Parameters[2].Actual}</td>
                      <td>{dataObject.Reports[machine].Report.EngineeringParameters.Parameters[3].Actual}</td>
                      <td>{dataObject.Reports[machine].Report.EngineeringParameters.Parameters[4].Actual}</td>
                      <td>{dataObject.Reports[machine].Report.EngineeringParameters.Parameters[5].Actual}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="detail-box">
              <div className="detail-title">Down Times</div>
              <table>
                <thead>
                  <tr>
                    <td>Start Time</td>
                    <td>End Time</td>
                    <td>Duration</td>
                    <td>Reason</td>
                  </tr>
                </thead>
                <tbody>
                  {
                    dataObject.Reports[machine].Summary.Downtimes.map((element, index) => {
                      return (
                        <tr key={index}>
                          <td>{element.From}</td>
                          <td>{element.To}</td>
                          <td>{element.Duration}</td>
                          <td>{element.Reason}</td>
                        </tr>
                      )
                    })
                  }


                </tbody>
              </table>
            </div>
          </div>
        </div>

      ) : null}

      <div className="summary-container">
        <div className="chart-section">
          <div className="chart">
            <Line data={chartConfig} options={options} datasetKeyProvider={datasetKeyProvider} redraw={false} />
          </div>
        </div>
        <div className="analyze-section">
          <div className="title-bar">
            <div className="title"> <span className={dataObject?.Date.Shift == 'Day' ? 'day' : 'night'}> {dataObject?.Date.Shift == 'Day' ? day : night} </span> {` ${dataObject?.Date.Day}, ${months[dataObject?.Date.Month]}`} </div>
            <div className="calender" onClick={() => toggleSelectModal()}>
              {calender}
            </div>
          </div>
          <div className="percentage-section">
            <div className="percentage-circle">
              {/* <div className="percentage">
                {dataObject?.Summary?.IMEfficiency} <div className="percent-icon"> {percent}</div>
              </div>
              <svg width="200" height="200" viewBox="0 0 250 250">
                <circle
                  className="bg"
                  cx="125"
                  cy="125"
                  r="115"
                  fill="none"
                  stroke="#182d3c"
                  strokeWidth="20"
                ></circle>
                <circle
                  className="fg"
                  cx="125"
                  cy="125"
                  r="115"
                  strokeDasharray={' 400 400'}
                  fill="none"
                  stroke="#12d39e"
                  strokeWidth="20"
                  strokeLinecap="round"
                ></circle>
              </svg>
              <div className="percentage-title"> IM Efficieny</div> */}
              {circularBar(dataObject?.Summary?.IMEfficiency, 'IM Efficieny')}
            </div>
            <div className="percentage-circle">
              {circularBar(dataObject?.Summary?.BMEfficiency, 'IM Efficieny')}
            </div>
            <div className="percentage-circle">
              {circularBar(dataObject?.Summary?.IMLEfficiency, 'IM Efficieny')}

            </div>
          </div>
        </div>
        <div className="data-list-section">
          <table>
            <thead>
              <tr>
                <td> Machine</td>
                <td>Product</td>
                <td> Planned Qty</td>
                <td> Proceed Qty</td>
                <td> Runtime</td>
                <td> Efficiency </td>
              </tr>
            </thead>
            <tbody>
              {dataObject?.Reports.map((element, index) => {
                return (
                  <tr key={index} onClick={() => handleIndex(index)}>
                    <td>{element.Machine}</td>
                    <td>{element.Report?.Product?.ProductName}</td>
                    <td>{element.Summary?.PlannedQty}</td>
                    <td>{element.Summary?.ProceedQty}</td>
                    <td>{element.Summary?.ProductionHours}</td>
                    <td>{element.Summary?.Efficiency}</td>
                  </tr>
                )
              })}
              {/* <tr onClick={() => setMachineModal(!machineModal)}>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr> */}

            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Summary;
