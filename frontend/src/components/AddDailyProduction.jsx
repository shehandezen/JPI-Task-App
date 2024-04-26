import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer, Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { toastConfig } from "../toastConfig";
import "../css/componentStyles/adddailyproduction.css";
import MiniLoader from "./MiniLoader";
import {
  addProduction,
  addProductionReport,
  getProductionReports,
  getProducts,
  updateProductionReport,
} from "../app.service";
import MessageBox from "./MessageBox";

const AddDailyProduction = () => {
  const navigate = useNavigate()

  const [data, setData] = useState({
    Date: "",
    Shift: "",
    Supervisor: "",
    Machines: [],
    Status: "Active"
  });

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setMessages([]);
    }, 7500);

    // clearInterval();
  }, [messages]);

  const machines = [
    "IM 01",
    "IM 02",
    "IM 03",
    "IM 04",
    "IM 05",
    "IM 06",
    "IM 07",
    "IM 08",
    "IM 09",
    "IM 10",
    "IM 11",
    "IM 12",
    "IM 13",
    "IM 14",
    "IM 15",
    "IM 16",
    "IM 17",
    "IM 18",
    "IM 19",
    "IM 20",
    "IM 21",
    "IM 22",
    "IM 23",
    "IM 24",
    "IML 01",
    "IML 02",
    "IML 03",
    "IML 04",
    "IML 05",
    "IML 06",
    "IML 07",
    "BM 01",
    "BM 02",
    "BM 03",
    "BM 04",
    "BM 05",
    "BM 06",
    "BM 07",
    "BM 08",
    "BM 09",
    "BM 10",
    "IBM 01",
  ];

  const reasons = [
    "Running",
    "Not Planned",
    "Lack of Operators",
    "Mould Repair",
    "Machine Breakdown",
    "Quality Issue",
  ];

  //   const handleCheck = (value, machine) => {
  //     if (machines.includes(machine) && !value) {
  //       let plannedMachines = data.PlannedMachines;
  //       plannedMachines.splice(
  //         data.PlannedMachines.indexOf({ MachineNo: machine }),
  //         1
  //       );
  //       setData({ ...data, PlannedMachines: plannedMachines });
  //     } else if (value) {
  //       setData({
  //         ...data,
  //         PlannedMachines: [...data.PlannedMachines, { MachineNo: machine }],
  //       });
  //     }

  //     console.log(value, machine);
  //   };

  const handleChange = async (value, type, index = -1) => {
    if (type == "date") {
      setData({ ...data, Date: value });
    } else if (type == "shift") {
      setData({ ...data, Shift: value });
    } else if (type == "supervisor") {
      setData({ ...data, Supervisor: value });
    } else if (type == "machine") {
      let setted = false;
      for await (const i of data.Machines) {
        if (i?.machine == machines[index]) {
          let copyMachines = data.Machines;
          await copyMachines.splice(data.Machines.indexOf(i), 1);
          await copyMachines.push({ machine: machines[index], status: value });
          setData({ ...data, Machines: copyMachines });
          setted = true;
          break;
        }
      }
      if (!setted) {
        setData({
          ...data,
          Machines: [
            ...data.Machines,
            { machine: machines[index], status: value },
          ],
        });
      }
    }
  };
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    // console.log(data);
    for await (let machine of data.Machines) {
      if (machine.status) {
        let getcurrentproduct = await getProducts(`{"machineNo":"${machine.machine}"}`)
        if (getcurrentproduct.status == 200) {
          // console.log(getcurrentproduct.data.data[0]._id)
          let addProductionData = await addProduction({
            MachineNo: machine.machine,
            Date: data.Date,
            Shift: data.Shift,
            Supervisor: data.Supervisor,
            Product: getcurrentproduct?.data?.data[0]?._id,
            Status: 'Active',
            StartTime: '',
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

          if (addProductionData.status == 'success') {
            continue
          } else if (addProductionData.status == 'error') {
            toast.error(addProduction.message, toastConfig)
          } else if (addProductionData.status == 500) {
            toast.error('Backend error', toastConfig)
          } else {
            toast.error('Something went wrong', toastConfig)
          }
          // setData({
          //   ...data,
          //   Machines:[
          //     ...data.Machines, {
          //       ...machine,
          //       data: addProductionData.data?._id
          //     }
          //   ]
          // })

          data.Machines[data.Machines.indexOf(machine)].data = addProductionData.data?._id
        }

      }

    }

 
    const getAlreadyActive = await getProductionReports('{"Status":"Active"}');


    if (getAlreadyActive.data.status == "success" && getAlreadyActive.data.data.length != 0) {
      const updateAlreadyActive = await updateProductionReport(
        getAlreadyActive.data.data[0]._id,
        { Status: "Finished" }
      );

      console.log(updateAlreadyActive)
      if (updateAlreadyActive.status == 200) {
        const addNewReport = await addProductionReport(data);
        if (addNewReport.status == "success") {
          toast.success('New report successfully created!', toastConfig)
          navigate('/dashboard/production/reports')
        }else if (addNewReport.status == 500) {
          toast.error('Backend error', toastConfig)
        } else {
          toast.error('Something went wrong', toastConfig)
        }

      }else if (updateAlreadyActive.status == 500) {
        toast.error('Backend error', toastConfig)
      } else {
        toast.error('Something went wrong', toastConfig)
      }
      
    }  else if (getAlreadyActive.data.status == 'error') {
      toast.error(getAlreadyActive.data.message, toastConfig)
    } else if (getAlreadyActive.status == 500) {
      toast.error('Backend error', toastConfig)
    } else {
      const addNewReport = await addProductionReport(data);
      console.log(addNewReport)
      if (addNewReport.status == "success") {
        toast.success('New report successfully created!', toastConfig)
          navigate('/dashboard/production/reports')
        }else if (addNewReport.status == 500) {
          toast.error('Backend error', toastConfig)
        } else {
          toast.error('Something went wrong', toastConfig)
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
      <div className="production-container">
        <div className="title">
          Daily Production
          <span className="line"></span>
        </div>

        <div className="inputs-container">
          <div className="input-container">
            <div className="input-label">Date</div>
            <input
              type="Date"
              placeholder="Date"
              value={data.Date}
              onChange={(e) => handleChange(e.target.value, "date")}
            />
          </div>
          <div className="input-container">
            <div className="input-label">Shift</div>
            <input
              type="text"
              placeholder="Shift"
              value={data.Shift}
              onChange={(e) => handleChange(e.target.value, "shift")}
            />
          </div>
          <div className="input-container">
            <div className="input-label">Supervisor </div>
            <input
              type="text"
              placeholder="Supervisor"
              value={data.Supervisor}
              onChange={(e) => handleChange(e.target.value, "supervisor")}
            />
          </div>
        </div>
        <div className="check-box-container">
          <div className="check-boxs">
            {machines.map((element, indexM) => {
              return (
                <div className="check-box" key={indexM}>
                  {/* <input
                    type="checkbox"
                    value={element}
                    onChange={(e) => handleCheck(e.target.checked, element)}
                  /> */}
                  <div className="check-box-name">{element}</div>

                  <select
                    onChange={(e) =>
                      handleChange(e.target.value, "machine", indexM)
                    }
                  >
                    <option value="">Status</option>

                    {reasons.map((ele, indexR) => {
                      return (
                        <option key={indexR} value={ele}>
                          {ele}
                        </option>
                      );
                    })}
                  </select>
                </div>
              );
            })}
          </div>
          <div className="input-container">
            <button onClick={() => handleSubmit()}>Create</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddDailyProduction;
