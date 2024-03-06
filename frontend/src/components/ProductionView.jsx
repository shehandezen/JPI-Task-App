import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faAngleDoubleRight, faPlus, faXmark, faPencil } from "@fortawesome/free-solid-svg-icons";
import '../css/componentStyles/machinereport.css'

const ProductionView = () => {
    const tag = <FontAwesomeIcon icon={faTag} />;
    const arrow = <FontAwesomeIcon icon={faAngleDoubleRight} />;
    const plus = <FontAwesomeIcon icon={faPlus} />;
    const X = <FontAwesomeIcon icon={faXmark} />;
    const pencil = <FontAwesomeIcon icon={faPencil} />;

    const [disabled, setDisabled] = useState(false)

    const [data, setData] = useState({
        MachineNo: 'dummyData',
        Date: 'dummyData',
        Shift: 'dummyData',
        Supervisor: 'dummyData',
        Product: {
            _id: 'dummyData',
            ProductName: 'dummyData'
        },
        StartTime: 'dummyData',
        EndTime: 'dummyData',
        Counter: [{
            Time: '00:00',
            Counter: 'dummyData',
            Damage: {
                Material: 'dummyData',
                Machine: 'dummyData',
                Clear: 'dummyData'
            }
        }],
        NoOfPackets: 'dummyData',
        DownTimes: [{
            From: '00:00',
            To: '00:00',
            Reason: 'dummyData'
        }],
        EngineeringParameters: {
            PreHeaterTemp: {
                Specified: 'dummyData',
                Actual: 'dummyData'
            },
            ZoneTemp: [
                {
                    Zone: 'Zone 01',
                    Specified: 'dummyData',
                    Actual: 'dummyData'
                },
                {
                    Zone: 'Zone 02',
                    Specified: 'dummyData',
                    Actual: 'dummyData'
                },
                {
                    Zone: 'Zone 03',
                    Specified: 'dummyData',
                    Actual: 'dummyData'
                },
                {
                    Zone: 'Zone 04',
                    Specified: 'dummyData',
                    Actual: 'dummyData'
                },
            ],

            Parameters: [
                {
                    Parameter: 'Holding Pressure',
                    Specified: 'dummyData',
                    Actual: 'dummyData'
                },
                {
                    Parameter: 'Back Pressure',
                    Specified: 'dummyData',
                    Actual: 'dummyData'
                },
                {
                    Parameter: 'Injection Time',
                    Specified: 'dummyData',
                    Actual: 'dummyData'
                },
                {
                    Parameter: 'Cooling Time',
                    Specified: 'dummyData',
                    Actual: 'dummyData'
                },
                {
                    Parameter: 'Chilled Water Temp',
                    Specified: 'dummyData',
                    Actual: 'dummyData'
                },
                {
                    Parameter: 'Oil Temp',
                    Specified: 'dummyData',
                    Actual: 'dummyData'
                },]


        }
    })


    const times = ['07:30', '08:00', '09:00', '10:00', '11:00', '12:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '07:30']
    const [downtimes, setDowntimes] = useState([{
        from: '',
        to: '',
        reason: ''
    }])

    const handlePlusButton = () => {
        setDowntimes([...downtimes, {
            from: '',
            to: '',
            reason: ''
        }])
    }

    const removeItem = (index) => {
        const downtimeCopy = [...downtimes]
        downtimeCopy.splice(index, 1)
        setDowntimes(downtimeCopy)
    }




    return (
        <React.Fragment>
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
                            <input disabled={disabled} type="time" value={data.StartTime} />
                        </div>
                        <div className="input-container">
                            <div className="input-label">
                                End Time
                            </div>
                            <input disabled={disabled} type="time" value={data.EndTime} />
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

                                        <input disabled={disabled} type="number" value={ele.Counter} /><div className="input-label">
                                            Counter
                                        </div>
                                    </div>
                                </td>{(index == 0) ? '' : (<td>
                                    <div className="inputs-container">
                                        <div className="input-container">
                                            <input disabled={disabled} type="number" value={ele.Counter.Damage.Material} />
                                            <div className="tiny-label">Material</div>
                                        </div>
                                        <div className="input-container">
                                            <input disabled={disabled} type="number" value={ele.Counter.Damage.Machine} />
                                            <div className="tiny-label">Machine</div>
                                        </div>
                                        <div className="input-container">
                                            <input disabled={disabled} type="number" value={ele.Counter.Damage.Clear} />
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
                            <input disabled={disabled} type="number" value={data.NoOfPackets} />
                        </div>
                        <div className="info-section down-time">
                            <div className="title">Down Times <span className="line"></span></div>
                            <table>
                                {data.DownTimes.map((ele, index) => (
                                    <>
                                        <tr key={index}>
                                            <td>
                                                <div className="input-container">
                                                    <input disabled={disabled} type="time" value={ele.From} />
                                                    <div className="tiny-label">From</div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="input-container">
                                                    <input disabled={disabled} type="time" value={ele.To} />
                                                    <div className="tiny-label">To</div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="input-container">
                                                    <input disabled={disabled} type="text" value={ele.Reason} />
                                                    <div className="tiny-label">Reason</div>{index == 0 ? '' : (<button className="delete" onClick={(index) => removeItem(index)}>{X}</button>)}
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
                                            <input disabled={disabled} type="text" value={data.EngineeringParameters.PreHeaterTemp.Specified} />
                                            <div className="tiny-label">Specified</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="input-container">
                                            <input disabled={disabled} type="text" value={data.EngineeringParameters.PreHeaterTemp.Actual} />
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
                                                        <input disabled={disabled} type="text" value={ele.Specified} />
                                                        <div className="tiny-label">Specified</div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="input-container">
                                                        <input disabled={disabled} type="text" value={ele.Actual} />
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
                                                        <input disabled={disabled} type="text" value={ele.Specified} />
                                                        <div className="tiny-label">Specified</div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="input-container">
                                                        <input disabled={disabled} type="text" value={ele.Actual} />
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
                <div className="edit-data">{pencil}</div>
            </div>
        </React.Fragment>
    );
};

export default ProductionView;
