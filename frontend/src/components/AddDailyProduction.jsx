import React, { useState } from 'react'
import '../css/componentStyles/adddailyproduction.css'
import MiniLoader from './MiniLoader'

const AddDailyProduction = () => {

    const [data, setData] = useState({
        Date: '',
        Shift: '',
        Supervisor: '',
        PlannedMachines: []
    })

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

    const handleCheck = (value, machine) => {
        if (machines.includes(machine) && !value) {
            let plannedMachines = data.PlannedMachines
            plannedMachines.splice(data.PlannedMachines.indexOf({MachineNo: machine}), 1)
            setData({ ...data, PlannedMachines: plannedMachines })
        } else if (value) {
            setData({ ...data, PlannedMachines: [...data.PlannedMachines,{MachineNo: machine}] })
        }

        console.log(value, machine)
    }


    const handleChange = (value, type) => {
        if (type == 'date') {
            setData({ ...data, Date: value })
        } else if (type == 'shift') {
            setData({ ...data, Shift: value })
        } else if (type == 'supervisor') {
            setData({ ...data, Supervisor: value })
        }
    }
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async() => {
        console.log(data)
        setIsLoading(true)
        await setInterval(() => {
       
          setIsLoading(false)
        }, 5000)
    }

    return (
        <React.Fragment>
            {isLoading ? <MiniLoader /> : ""}
            <div className="production-container">
                <div className="title">
                    Daily Production
                    <span className="line"></span>
                </div>

                <div className="inputs-container">
                    <div className="input-container">
                        <div className="input-label">Date</div>
                        <input type="Date" placeholder='Date' value={data.Date} onChange={(e) => handleChange(e.target.value, 'date')} />
                    </div>
                    <div className="input-container">
                        <div className="input-label">Shift</div>
                        <input type="text" placeholder='Shift' value={data.Shift} onChange={(e) => handleChange(e.target.value, 'shift')} />
                    </div>
                    <div className="input-container">
                        <div className="input-label">Supervisor </div>
                        <input type="text" placeholder='Supervisor' value={data.Supervisor} onChange={(e) => handleChange(e.target.value, 'supervisor')} />
                    </div>

                </div>
                <div className="check-box-container">
                    <div className="input-label">Planned Machines</div>
                    <div className="check-boxs">
                        {/* <div className="check-box">
                            <input type="checkbox" />
                            <div className="check-box-name">Im 01</div>
                        </div> */}
                        {machines.map((element, index) => {
                            return (<div className="check-box" key={index}>
                                <input type="checkbox" value={element} onChange={(e) => handleCheck(e.target.checked, element)} />
                                <div className="check-box-name">{element}</div>
                            </div>)
                        })}
                    </div>
                    <div className="input-container">
                        <button onClick={() => handleSubmit()}>Create</button>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}

export default AddDailyProduction