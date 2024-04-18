import React, { useState } from "react";
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
import { faCalendarDays, faPercent, faSun, faMoon, faXmark, faHandPointRight} from "@fortawesome/free-solid-svg-icons";
import "../css/summary.css";

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


  const toggleSelectModal = () => {
    setSelectModal(!selectModal)
  }

  const options = {
    responsive: true,
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


  const labels = ['April 01', 'April 02', 'April 03', 'April 04', 'April 05', 'April 06', 'April 07', 'April 08', 'April 09', 'April 10', 'April 11', 'April 12', 'April 13', 'April 14', 'April 15', 'April 16', 'April 17', 'April 18', 'April 19', 'April 20', 'April 21', 'April 22', 'April 23', 'April 24', 'April 25', 'April 26', 'April 27', 'April 28', 'April 29', 'April 30',];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Production Efficiency",
        backgroundColor: "#12d39e",
        borderColor: "#12d39e",
        data: [85, 99, 43, 87, 33, 86, 71, 85, 99, 43, 87, 33, 86, 71, 85, 99, 43, 87, 33, 86, 71, 85, 99, 43, 87, 33, 86, 71],
      },
      {
        label: "Production Hour Utilization ",
        backgroundColor: "#2cbdc0",
        borderColor: "#2cbdc0",
        data: [75, 89, 83, 85, 93, 96, 81, 75, 89, 83, 85, 93, 96, 81, 75, 89, 83, 85, 93, 96, 81, 75, 89, 83, 85, 93, 96, 81],
      },
    ],
  };


  return (
    <React.Fragment>
      {selectModal ? (<div className="selection-modal">
        <div className="modal-box">
          <input type="date" />
          <div className="icons">
            <div className="day select-icon">
              {day}
            </div>
            <div className="night">
              {night}
            </div>
          </div>
          <div className="btn-group">
            <button> OK</button>
            <button onClick={() => toggleSelectModal()}> CANCEL</button>
          </div>
        </div>
      </div>) : null}

      {machineModal ? (
        <div className="machine-modal">
          <div className="modal-box">
            <div className="close" onClick={()=> setMachineModal(!machineModal)}>{x}</div>
            <div className="title"> IM 01</div>
            <div className="percentage-section">
              <div className="percentage-circle">
              <div className="percentage">
                95 <div className="percent-icon"> {percent}</div>
              </div>
              <svg width="150" height="150" viewBox="0 0 250 250">
                <circle
                  className="bg"
                  cx="125"
                  cy="125"
                  r="115"
                  fill="none"
                  stroke="#10202b"
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
              <div className="percentage-title"> Efficieny</div>
              </div>
              <div className="percentage-circle">
              <div className="percentage">
                95 <div className="percent-icon"> {percent}</div>
              </div>
              <svg width="150" height="150" viewBox="0 0 250 250">
                <circle
                  className="bg"
                  cx="125"
                  cy="125"
                  r="115"
                  fill="none"
                  stroke="#10202b"
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
              <div className="percentage-title"> Efficieny</div>
              </div>
            </div>
            <div className="detail-box">
              <div className="detail-title">Production Records</div>
              <div className="detail-group">
                <div className="detail-key">{pointer} Key : </div>
                <div className="detail-value"> Value</div>
              </div>
            </div>
            <div className="detail-box">
            <div className="detail-title">Engineering Parameters</div>
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
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Acual</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
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
                  <tr>
                    <td>0</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>0</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      ) : null}

      <div className="summary-container">
        <div className="chart-section">
          <div className="chart">
            <Line data={data} options={options} />
          </div>
        </div>
        <div className="analyze-section">
          <div className="title-bar">
            <div className="title"> 18 April </div>
            <div className="calender" onClick={() => toggleSelectModal()}>
              {calender}
            </div>
          </div>
          <div className="percentage-section">
            <div className="percentage-circle">
              <div className="percentage">
                95 <div className="percent-icon"> {percent}</div>
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
              <div className="percentage-title"> Efficieny</div>
            </div>
            <div className="percentage-circle">
              <div className="percentage">
                85 <div className="percent-icon"> {percent}</div>
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
                  strokeDasharray={' 500 400'}
                  fill="none"
                  stroke="#12d39e"
                  strokeWidth="20"
                  strokeLinecap="round"
                ></circle>
              </svg>
              <div className="percentage-title"> Efficieny</div>

            </div>
            <div className="percentage-circle">
              <div className="percentage">
                75 <div className="percent-icon"> {percent}</div>
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
                  strokeDasharray={' 600 600'}
                  fill="none"
                  stroke="#12d39e"
                  strokeWidth="20"
                  strokeLinecap="round"
                ></circle>
              </svg>
              <div className="percentage-title"> Efficieny</div>

            </div>
          </div>
        </div>
        <div className="data-list-section">
          <table>
            <thead>
              <tr>
                <td> Machine</td>
                <td>Product</td>
                <td> Proceed Qty</td>
                <td> Efficiency </td>
                <td> Damages</td>
              </tr>
            </thead>
            <tbody>
              <tr onClick={() => setMachineModal(!machineModal)}>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Summary;
