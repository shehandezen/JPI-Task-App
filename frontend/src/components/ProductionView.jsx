import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faAngleDoubleRight, faPlus, faXmark, faPencil } from "@fortawesome/free-solid-svg-icons";
import '../css/componentStyles/machinereport.css'
import MiniLoader from "./MiniLoader";

const ProductionView = () => {
    const tag = <FontAwesomeIcon icon={faTag} />;
    const arrow = <FontAwesomeIcon icon={faAngleDoubleRight} />;
    const plus = <FontAwesomeIcon icon={faPlus} />;
    const X = <FontAwesomeIcon icon={faXmark} />;
    const pencil = <FontAwesomeIcon icon={faPencil} />;

    const [disabled, setDisabled] = useState(true)

    const toggleDisable = () => {
        setDisabled(!disabled)
    }

    const [data, setData] = useState({
        MachineNo: '',
        Date: '',
        Shift: '',
        Supervisor: '',
        Product: {
            _id: '',
            ProductName: ''
        },
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
        }],
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

    const [isLoading, setIsLoading] = useState(false)

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

    const [downtimes, setDowntimes] = useState([{
        from: '',
        to: '',
        reason: ''
    }])

    const handlePlusButton = () => {
        setData({
            ...data, DownTimes: [...data.DownTimes, {
                from: '',
                to: '',
                reason: ''
            }]
        })
    }

    const removeItem = (index) => {
        const downtimeCopy = [...data.DownTimes]
        console.log(index)
        downtimeCopy.splice(index, 1)

        console.log(downtimeCopy)
        setData({ ...data, DownTimes: downtimeCopy })
    }


    const handleChange = (value, type) => {
        console.log(value, type)
        switch (type) {
            case 'starttime':
                setData({ ...data, StartTime: value })
                break;
            case 'endtime':
                setData({ ...data, EndTime: value })
                break;
            case 'noofpackets':
                setData({ ...data, NoOfPackets: value })
                break;
            case 'preheaterspecified':
                setData({
                    ...data, EngineeringParameters: {
                        ...data.EngineeringParameters,
                        PreHeaterTemp: { ...data.EngineeringParameters.PreHeaterTemp, Specified: value }
                    }
                })
                break;
            case 'preheateractual':
                setData({
                    ...data, EngineeringParameters: {
                        ...data.EngineeringParameters,
                        PreHeaterTemp: { ...data.EngineeringParameters.PreHeaterTemp, Actual: value }
                    }
                })
                break;

            default:
                break;
        }

        for (let i in data.Counter) {
            let copyArr
            copyArr = data.Counter
            if (`${i}-counter` == type) {

                copyArr[i].Counter = value
                setData({ ...data, Counter: copyArr })
            } else if (`${i}-material` == type) {

                copyArr[i].Damage.Material = value
                setData({ ...data, Counter: copyArr })
            } else if (`${i}-machine` == type) {

                copyArr[i].Damage.Machine = value
                setData({ ...data, Counter: copyArr })
            } else if (`${i}-clear` == type) {

                copyArr[i].Damage.Clear = value
                setData({ ...data, Counter: copyArr })
            }
        }

        for (let i in data.DownTimes) {
            let copyArr
            copyArr = data.DownTimes
            if (`${i}-to` == type) {

                copyArr[i].to = value
                setData({ ...data, DownTimes: copyArr })
            } else if (`${i}-from` == type) {

                copyArr[i].from = value
                setData({ ...data, DownTimes: copyArr })
            } else if (`${i}-reason` == type) {

                copyArr[i].reason = value
                setData({ ...data, DownTimes: copyArr })
            }
        }

        for (let i in data.EngineeringParameters.ZoneTemp) {
            let copyArr
            copyArr = data.EngineeringParameters.ZoneTemp
            if (`${i}-zone-specified` == type) {

                copyArr[i].Specified = value
                setData({ ...data, EngineeringParameters: { ...data.EngineeringParameters, ZoneTemp: copyArr} })
            } else if (`${i}-zone-actual` == type) {

                copyArr[i].Actual = value
                setData({ ...data, EngineeringParameters: { ...data.EngineeringParameters, ZoneTemp: copyArr} })
            } 
        }

        for (let i in data.EngineeringParameters.Parameters) {
            let copyArr
            copyArr = data.EngineeringParameters.Parameters
            if (`${i}-specified` == type) {

                copyArr[i].Specified = value
                setData({ ...data, EngineeringParameters: { ...data.EngineeringParameters, Parameters: copyArr} })
            } else if (`${i}-actual` == type) {

                copyArr[i].Actual = value
                setData({ ...data, EngineeringParameters: { ...data.EngineeringParameters, Parameters: copyArr} })

            } 
        }

    }

    const handleSubmit = () => {
        console.log(data)
    }



    return (
        <React.Fragment>
              {isLoading ? <MiniLoader /> : ""}
            <div className="report-container">
                <div className="title">
                    {data.MachineNo}
                    <span className="line"></span>
                </div>
                <div className="tags-container">
                    <div className="tag">{data.Date}</div>
                    <div className="tag">{data.Shift}</div>
                    <div className="tag">{data.Supervisor}</div>
                </div>
                <div className="detail-line">
                    <div className="detail">
                        {tag} Product Name : {data.Product.ProductName} <Link to={`/dashbaord/view/${data.Product._id}`} className="more-info">{arrow}</Link>
                    </div>

                </div>
                <div className="counter-container">
                    <div className="start-end-times">
                        <div className="input-container">
                            <div className="input-label">
                                Start Time
                            </div>
                            <input disabled={disabled} type="time" value={data.StartTime} onChange={(e) => handleChange(e.target.value, 'starttime')} />
                        </div>
                        <div className="input-container">
                            <div className="input-label">
                                End Time
                            </div>
                            <input disabled={disabled} type="time" value={data.EndTime} onChange={(e) => handleChange(e.target.value, 'endtime')} />
                        </div>
                    </div>
                    <div className="data-section">
                        <div className="section-line"></div>
                        <table>

                            {data.Counter?.map((ele, index) => (<React.Fragment key={index}> <tr>
                                <td>
                                    <div className="input-container">

                                        <input disabled type="time" value={ele.Time} /><div className="input-label">
                                            Time
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="input-container">

                                        <input disabled={disabled} type="number" value={ele.Counter} onChange={(e) => handleChange(e.target.value, `${index}-counter`)} /><div className="input-label">
                                            Counter
                                        </div>
                                    </div>
                                </td>{(index == 0) ? '' : (<td>
                                    <div className="inputs-container">
                                        <div className="input-container">
                                            <input disabled={disabled} type="number" value={ele.Damage.Material} onChange={(e) => handleChange(e.target.value, `${index}-material`)} />
                                            <div className="tiny-label">Material</div>
                                        </div>
                                        <div className="input-container">
                                            <input disabled={disabled} type="number" value={ele.Damage.Machine} onChange={(e) => handleChange(e.target.value, `${index}-machine`)} />
                                            <div className="tiny-label">Machine</div>
                                        </div>
                                        <div className="input-container">
                                            <input disabled={disabled} type="number" value={ele.Damage.Clear} onChange={(e) => handleChange(e.target.value, `${index}-clear`)} />
                                            <div className="tiny-label">Clear</div>
                                        </div>

                                    </div>
                                </td>)}

                            </tr>
                                <div className="section-line"></div> </React.Fragment>))}


                        </table>

                        <div className="section-line"></div>

                        <div className="input-container">
                            <div className="input-label">
                                No Of packets
                            </div>
                            <input disabled={disabled} type="number" value={data.NoOfPackets} onChange={(e) => handleChange(e.target.value, 'noofpackets')} />
                        </div>
                        <div className="info-section down-time">
                            <div className="title">Down Times <span className="line"></span></div>
                            <table>
                                {data.DownTimes.map((ele, index) => (
                                    <>
                                        <tr key={index}>
                                            <td>
                                                <div className="input-container">
                                                    <input disabled={disabled} type="time" value={ele.from} onChange={(e) => handleChange(e.target.value, `${index}-from`)} />
                                                    <div className="tiny-label">From</div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="input-container">
                                                    <input disabled={disabled} type="time" value={ele.to} onChange={(e) => handleChange(e.target.value, `${index}-to`)} />
                                                    <div className="tiny-label">To</div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="input-container">
                                                    <input disabled={disabled} type="text" value={ele.reason} onChange={(e) => handleChange(e.target.value, `${index}-reason`)} />
                                                    <div className="tiny-label">Reason</div>{index == 0 ? '' : (<button className="delete" onClick={() => removeItem(index)}>{X}</button>)}
                                                </div>

                                            </td>
                                        </tr>

                                    </>
                                ))}
                                {!disabled ? (<div className="plus-button">
                                    <div className="line"></div>
                                    <button onClick={() => handlePlusButton()}>{plus}</button>
                                </div>) : ''}
                                <div className="section-line"></div>
                            </table>
                        </div>
                        <div className="info-section ">
                            <div className="title">Engineering Parameters <span className="line"></span></div>
                            <table>

                                <tr>
                                    <td>
                                        <div className="info-text">Pre Heater Temp </div>
                                    </td>
                                    <td>
                                        <div className="input-container">
                                            <input disabled={disabled} type="text" value={data.EngineeringParameters.PreHeaterTemp.Specified} onChange={(e) => handleChange(e.target.value, `preheaterspecified`)} />
                                            <div className="tiny-label">Specified</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="input-container">
                                            <input disabled={disabled} type="text" value={data.EngineeringParameters.PreHeaterTemp.Actual} onChange={(e) => handleChange(e.target.value, `preheateractual`)} />
                                            <div className="tiny-label">Actual</div>
                                        </div>
                                    </td>
                                </tr>
                                <div className="section-line"></div>

                                <tr>
                                    <td colSpan={3}>Zone Temperature</td>
                                </tr>
                                {
                                    data.EngineeringParameters.ZoneTemp?.map((ele, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <div className="info-text">{ele.Zone} </div>
                                                </td>
                                                <td>
                                                    <div className="input-container">
                                                        <input disabled={disabled} type="text" value={ele.Specified} onChange={(e) => handleChange(e.target.value, `${index}-zone-specified`)} />
                                                        <div className="tiny-label">Specified</div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="input-container">
                                                        <input disabled={disabled} type="text" value={ele.Actual} onChange={(e) => handleChange(e.target.value, `${index}-zone-actual`)} />
                                                        <div className="tiny-label">Actual</div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                {/* <tr>
                                    <td>
                                        <div className="info-text">Zone 01 </div>
                                    </td>
                                    <td>
                                        <div className="input-container">
                                            <input disabled={disabled} type="text" />
                                            <div className="tiny-label">Specified</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="input-container">
                                            <input disabled={disabled} type="text" />
                                            <div className="tiny-label">Actual</div>
                                        </div>
                                    </td>
                                </tr> */}

                                <div className="section-line"></div>

                                {
                                    data.EngineeringParameters.Parameters?.map((ele, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <div className="info-text">{ele.Parameter}</div>
                                                </td>
                                                <td>
                                                    <div className="input-container">
                                                        <input disabled={disabled} type="text" value={ele.Specified} onChange={(e) => handleChange(e.target.value, `${index}-specified`)} />
                                                        <div className="tiny-label">Specified</div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="input-container">
                                                        <input disabled={disabled} type="text" value={ele.Actual} onChange={(e) => handleChange(e.target.value, `${index}-actual`)} />
                                                        <div className="tiny-label">Actual</div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }


                            </table>
                        </div>
                    </div>
                </div>
                {disabled ? (<div className="edit-data" onClick={() => toggleDisable()}>{pencil}</div>) : ''}

                {!disabled ? (<div className="input-container">
                    <div className="buttons">
                        <button onClick={() => handleSubmit()}>Save</button>
                        <button style={{ background: 'var(--red)' }}>Discard</button>
                    </div>
                </div>
                ) : ''}
            </div>
        </React.Fragment>
    );
};

export default ProductionView;
