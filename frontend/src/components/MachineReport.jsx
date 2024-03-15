import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faAngleDoubleRight, faPlus , faXmark} from "@fortawesome/free-solid-svg-icons";
import '../css/componentStyles/machinereport.css'

const MachineReport = () => {

    const tag = <FontAwesomeIcon icon={faTag} />;
    const arrow = <FontAwesomeIcon icon={faAngleDoubleRight} />;
    const plus = <FontAwesomeIcon icon={faPlus} />;
    const X = <FontAwesomeIcon icon={faXmark} />;

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
                    IM - 01
                    <span className="line"></span>
                </div>
                <div className="tags-container">
                    <div className="tag">2024.02.06</div>
                    <div className="tag">Day</div>
                    <div className="tag">Supervisor</div>
                </div>
                <div className="detail-line">
                    <div className="detail">
                        {tag} Product Name : Sample Item <span className="more-info">{arrow}</span>
                    </div>

                </div>
                <div className="counter-container">
                    <div className="start-end-times">
                        <div className="input-container">
                            <div className="input-label">
                                Start Time
                            </div>
                            <input type="time" />
                        </div>
                        <div className="input-container">
                            <div className="input-label">
                                End Time
                            </div>
                            <input type="time" />
                        </div>
                    </div>
                    <div className="data-section">
                        <div className="section-line"></div>
                        <table>

                            {times.map((ele, index) => (<React.Fragment key={index}> <tr>
                                <td>
                                    <div className="input-container">

                                        <input type="time" value={ele} disabled /><div className="input-label">
                                            Time
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="input-container">

                                        <input type="number" /><div className="input-label">
                                            Counter
                                        </div>
                                    </div>
                                </td>{(index == 0) ? '' : (<td>
                                    <div className="inputs-container">
                                        <div className="input-container">
                                            <input type="number" />
                                            <div className="tiny-label">Material</div>
                                        </div>
                                        <div className="input-container">
                                            <input type="number" />
                                            <div className="tiny-label">Machine</div>
                                        </div>
                                        <div className="input-container">
                                            <input type="number" />
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
                            <input type="number" />
                        </div>
                        <div className="info-section down-time">
                            <div className="title">Down Times <span className="line"></span></div>
                            <table>
                                {downtimes.map((ele, index) => (
                                <>
                                <tr key={index}>
                                    <td>
                                        <div className="input-container">
                                            <input type="time" value={ele.from} />
                                            <div className="tiny-label">From</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="input-container">
                                            <input type="time" value={ele.to} />
                                            <div className="tiny-label">To</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="input-container">
                                            <input type="text" value={ele.reason} />
                                            <div className="tiny-label">Reason</div>{index == 0 ? '' : ( <button className="delete" onClick={(index) => removeItem(index)}>{X}</button>)}
                                        </div>

                                    </td> 
                                </tr>
                        <div className="section-line"></div>
                        </>
                        ))}
                                <div className="plus-button">
                                    <div className="line"></div>
                                    <button onClick={() => handlePlusButton()}>{plus}</button>
                                </div>
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
                                            <input type="text" />
                                            <div className="tiny-label">Specified</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="input-container">
                                            <input type="text" />
                                            <div className="tiny-label">Actual</div>
                                        </div>
                                    </td>
                                </tr>
                                <div className="section-line"></div>

                                <tr>
                                    <td colSpan={3}>Zone Temperature</td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="info-text">Zone 01 </div>
                                    </td>
                                    <td>
                                        <div className="input-container">
                                            <input type="text" />
                                            <div className="tiny-label">Specified</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="input-container">
                                            <input type="text" />
                                            <div className="tiny-label">Actual</div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="info-text">Zone 02 </div>
                                    </td>
                                    <td>
                                        <div className="input-container">
                                            <input type="text" />
                                            <div className="tiny-label">Specified</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="input-container">
                                            <input type="text" />
                                            <div className="tiny-label">Actual</div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="info-text">Zone 03 </div>
                                    </td>
                                    <td>
                                        <div className="input-container">
                                            <input type="text" />
                                            <div className="tiny-label">Specified</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="input-container">
                                            <input type="text" />
                                            <div className="tiny-label">Actual</div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="info-text">Zone 04 </div>
                                    </td>
                                    <td>
                                        <div className="input-container">
                                            <input type="text" />
                                            <div className="tiny-label">Specified</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="input-container">
                                            <input type="text" />
                                            <div className="tiny-label">Actual</div>
                                        </div>
                                    </td>
                                </tr>
                                <div className="section-line"></div>

                                <tr>
                                    <td>
                                        <div className="info-text">Holding Pressure </div>
                                    </td>
                                    <td>
                                        <div className="input-container">
                                            <input type="text" />
                                            <div className="tiny-label">Specified</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="input-container">
                                            <input type="text" />
                                            <div className="tiny-label">Actual</div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="info-text">Back Pressure </div>
                                    </td>
                                    <td>
                                        <div className="input-container">
                                            <input type="text" />
                                            <div className="tiny-label">Specified</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="input-container">
                                            <input type="text" />
                                            <div className="tiny-label">Actual</div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="info-text">Injection Time </div>
                                    </td>
                                    <td>
                                        <div className="input-container">
                                            <input type="text" />
                                            <div className="tiny-label">Specified</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="input-container">
                                            <input type="text" />
                                            <div className="tiny-label">Actual</div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="info-text">Cooling Time </div>
                                    </td>
                                    <td>
                                        <div className="input-container">
                                            <input type="text" />
                                            <div className="tiny-label">Specified</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="input-container">
                                            <input type="text" />
                                            <div className="tiny-label">Actual</div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="info-text">Chilled Water Temp</div>
                                    </td>
                                    <td>
                                        <div className="input-container">
                                            <input type="text" />
                                            <div className="tiny-label">Specified</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="input-container">
                                            <input type="text" />
                                            <div className="tiny-label">Actual</div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="info-text">Oil Temp </div>
                                    </td>
                                    <td>
                                        <div className="input-container">
                                            <input type="text" />
                                            <div className="tiny-label">Specified</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="input-container">
                                            <input type="text" />
                                            <div className="tiny-label">Actual</div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="input-container">
                    <div className="buttons">
                        <button>Save</button>
                        <button style={{ background: 'var(--red)' }}>Discard</button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}


export default MachineReport 