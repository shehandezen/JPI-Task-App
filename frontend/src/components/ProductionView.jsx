import React, { useState, useEffect } from "react";
import { Link, useAsyncError, useLocation, useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faAngleDoubleRight, faPlus, faXmark, faPencil, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import '../css/componentStyles/machinereport.css'
import MiniLoader from "./MiniLoader";
import { addReport, getProductionById, getProductionReport, getReports, updateProduction, updateProductionReport, updateReport } from "../app.service";
import { getDiffTime } from "../time";

const ProductionView = () => {
    const tag = <FontAwesomeIcon icon={faTag} />;
    const arrow = <FontAwesomeIcon icon={faAngleDoubleRight} />;
    const plus = <FontAwesomeIcon icon={faPlus} />;
    const X = <FontAwesomeIcon icon={faXmark} />;
    const pencil = <FontAwesomeIcon icon={faPencil} />;
    const check = <FontAwesomeIcon icon={faCircleCheck} />;

    const { id } = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const pathArray = location.pathname.split('/')

    const [disabled, setDisabled] = useState(true)
    const [edit, setEdit] = useState(true)
    const [viewModal, setViewModal] = useState(false)

    const toggleDisable = () => {
        setDisabled(!disabled)
    }



    const [data, setData] = useState({})

    const [isLoading, setIsLoading] = useState(false)

    const [counter, setCounter] = useState([])

    const [zoneTemp, setZoneTemp] = useState([])

    const [downTimes, setDownTimes] = useState([])

    const [parameters, setParameters] = useState([])

    const fetchData = async () => {
        setIsLoading(true)
        const fetchedData = await getProductionById(id)

        if (fetchedData?.status == 200) {
            setData(fetchedData?.data?.data)
            setCounter([ ...fetchedData?.data?.data?.Counter])
            setDownTimes([ ...fetchedData?.data?.data?.DownTimes])
            if (fetchedData?.data?.data?.EngineeringParameters.ZoneTemp != undefined) {
                setZoneTemp([ ...fetchedData?.data?.data?.EngineeringParameters.ZoneTemp])
            }
            if (fetchedData?.data?.data?.EngineeringParameters.Parameters != undefined) {
                setParameters([ ...fetchedData?.data?.data?.EngineeringParameters.Parameters])
            }

            const currentProductionreport = await getProductionReport(pathArray[4]) 
            console.log(currentProductionreport.data?.data?.Status)
            if(currentProductionreport.data?.data?.Status != 'Active' || data.Status == 'Active'){
                setEdit(false)
            }


        }
        setIsLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handlePlusButton = () => {
        setDownTimes([
            ...downTimes, {
                From: '00:00',
                To: '00:00',
                Reason: ''
            }
        ])
    }

    const removeItem = (index) => {
        const downtimeCopy = [...downTimes]
        downtimeCopy.splice(index, 1)
        console.log(downtimeCopy, index)
        setDownTimes([...downtimeCopy])
    }

    const handleChangeCounter = (value, index, type) => {
        let arrCopy = [...counter]
        if (type == 'counter') {
            arrCopy[index].Counter = value
            setCounter(arrCopy)
        } else if (type == 'material') {
            arrCopy[index].Damage.Material = value
            setCounter(arrCopy)
        } else if (type == 'machine') {
            arrCopy[index].Damage.Machine = value
            setCounter(arrCopy)
        } else if (type == 'clear') {
            arrCopy[index].Damage.Clear = value
            setCounter(arrCopy)
        }
    }


    const handleChangeDownTimes = (value, index, type) => {
        let arrCopy = [...downTimes]
        if (type == 'from') {
            arrCopy[index].From = value
            setDownTimes(arrCopy)
        } else if (type == 'to') {
            arrCopy[index].To = value
            setDownTimes(arrCopy)
        } else if (type == 'reason') {
            arrCopy[index].Reason = value
            setDownTimes(arrCopy)
        }
    }

    const handleChangeZoneTemp = (value, index, type) => {
        let arrCopy = [...zoneTemp]
        if (type == 'zone-specified') {
            arrCopy[index].Specified = value
            setZoneTemp(arrCopy)
        } else if (type == 'zone-actual') {
            arrCopy[index].Actual = value
            setZoneTemp(arrCopy)
        }
    }


    const handleChangeParameters = (value, index, type) => {
        let arrCopy = [...parameters]
        if (type == 'specified') {
            arrCopy[index].Specified = value
            setParameters(arrCopy)
        } else if (type == 'actual') {
            arrCopy[index].Actual = value
            setParameters(arrCopy)
        }
    }


    const handleChange = (value, type) => {

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
                        ...data?.EngineeringParameters,
                        PreHeaterTemp: { ...data?.EngineeringParameters.PreHeaterTemp, Specified: value }
                    }
                })
                break;
            case 'preheateractual':
                setData({
                    ...data, EngineeringParameters: {
                        ...data?.EngineeringParameters,
                        PreHeaterTemp: { ...data?.EngineeringParameters.PreHeaterTemp, Actual: value }
                    }
                })
                break;

            default:
                break;
        }

    }

    const handleSubmit = async () => {
        setIsLoading(true)
        console.log(downTimes)
        console.log(await { ...data, Counter: counter, DownTimes: downTimes, EngineeringParameters: { ...data.EngineeringParameters, ZoneTemp: zoneTemp, Parameters: parameters }})
        const updatedData = await updateProduction(id, await { ...data, Counter: counter, DownTimes: downTimes, EngineeringParameters: { ...data.EngineeringParameters, ZoneTemp: zoneTemp, Parameters: parameters } })
        console.log(updatedData)
        if(updatedData.status ==200 ){
            // navigate('/dashboard/production/view')
            console.log(location)
           
            pathArray.splice(-2,2)
            console.log(pathArray.toString().replaceAll(',','/'))
            navigate(pathArray.toString().replaceAll(',','/'))

        }
        setIsLoading(false)
    }

    const finishReport = async()=>{
        setIsLoading(true)
        const date = new Date(data.Date)
        const year = date.getFullYear()
        const month = date.getMonth()
        const day = date.getDay()

        let newDowntime = []
        for await(let downtime of downTimes){
           let duration = getDiffTime(downtime.From, downtime.To)
            newDowntime.push({
                From: downtime.From,
                To: downtime.To,
                Duration: duration,
                Reason: downtime.Reason
            })
            
        }

        let firstCounter = data.Counter[0]?.Counter
        let lastCounter = 0
        let preCounter
        for await(let counter of data.Counter){ 
            if(counter.Counter != null ){
                preCounter = counter.Counter
            }else{
                lastCounter = preCounter
               
            }
        }
        const productionHours = getDiffTime(data.StartTime, data.EndTime)
        const proccedQty = (lastCounter - firstCounter) * data.Product?.usingCavities
        const plannedQty = productionHours * data.Product?.usingCavities * data.Product?.hourlyTarget
        const utilizedHours = proccedQty/( data.Product?.usingCavities * data.Product?.hourlyTarget)

        let materialDamages = 0
        let machineDamages = 0
        let clearDamages = 0

        for await(let counter of data.Counter){
            if(typeof(counter.Damage.Material) == 'number'){
                materialDamages = materialDamages + counter.Damage.Material
            }else if(typeof(counter.Damage.Machine) == 'number'){
                machineDamages = machineDamages + counter.Damage.Machine
            }else if(typeof(counter.Damage.Clear) == 'number'){
                clearDamages = clearDamages + counter.Damage.Clear
            }
        }

        const efficiency = (proccedQty/plannedQty) * 100
        const productionHoursUtilization = (utilizedHours/productionHours) * 100

        const machineObject = {
            Machine: data.MachineNo,
            Report: data._id,
            Summary: {
                Product:  data.Product?._id,
                PlannedQty: plannedQty,
                ProccedQty: proccedQty,
                Damages:{
                    Material: materialDamages,
                    Machine: machineDamages,
                    Clear: clearDamages
                },
               ProductionHours: productionHours,
               UtilizedHours: utilizedHours,
               NoOfPackets: data.NoOfPackets,
               Downtimes: newDowntime,
               Efficiency: efficiency,
               ProductionHoursUtilization: productionHoursUtilization
            }
        }

        const reportObject = {
            Date:{
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
            Reports: [machineObject]
        }
        // check if exist 

        const existReport = await getReports(`{"Date":{"Year":"${year}","Month":"${month}","Day":"${day}","Shift":"${data.Shift}"}}`)
        console.log(existReport.data?.data, `{"Date":{"Year":${year},"Month":${month},"Day":${day},"Shift":"${data.Shift}"}}`)
       
        if(existReport.data?.data.length == 0 ){
           

            const createReport = await addReport(reportObject)

            console.log(createReport)
            if(createReport.status == 200){
                const closeReport = await updateProductionReport(data._id, {Status: 'Closed'})
                if(closeReport.status == 200){
                    navigate('/dashboard')
                }
               
            }

           

        }else{
            console.log(existReport.data?.data.length == 0)
            const updateData = await updateReport(existReport.data?.data[0]._id,  {Reports:[...existReport.data?.data[0].Reports, machineObject]})
            console.log(updateData)
            if(updateData.status == 200){
                const closeReport = await updateProductionReport(data._id, {Status: 'Closed'})
                if(closeReport.status == 200){
                    navigate('/dashboard')
                }
            }
            
        }   

        // create object 
        // create if does not exist

       
        setIsLoading(false)
    }



    return (
        <React.Fragment>
            {isLoading ? <MiniLoader /> : null}
            {viewModal? (
                <React.Fragment>
                    <div className="modal-warpper">
                        <div className="modal-box">
                            <div className="modal-icon">{check}</div>
                            <div className="modal-message">Are you sure? Do you want to finish this report?</div>
                            <div className="buttons">
                                <button style={{backgroundColor:'#fd7e14'}} onClick={()=> finishReport()}>Confirm</button>
                                <button style={{backgroundColor:'var(--red)'}} onClick={()=> setViewModal(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>

                </React.Fragment>
            ):null}
            <div className="report-container">
                <div className="title">
                    {data?.MachineNo}
                    <span className="line"></span>
                </div>
                <div className="tags-container">
                    <div className="tag">{data?.Date}</div>
                    <div className="tag">{data?.Shift}</div>
                    <div className="tag">{data?.Supervisor}</div>
                    <div className="tag" style={data.Status == 'Active'? {background: 'var(--red)'}:{background: '#fd7e14'}}>{data?.Status}</div>
                </div>
                <div className="detail-line">
                    <div className="detail">
                        {tag} Product Name : {data?.Product?.productName} <Link to={`/dashbaord/view/${data?.Product?._id}`} className="more-info">{arrow}</Link>
                    </div>

                </div>
                <div className="counter-container">
                    <div className="start-end-times">
                        <div className="input-container">
                            <div className="input-label">
                                Start Time
                            </div>
                            <input disabled={disabled} type="time" value={data?.StartTime} onChange={(e) => handleChange(e.target.value, 'starttime')} />
                        </div>
                        <div className="input-container">
                            <div className="input-label">
                                End Time
                            </div>
                            <input disabled={disabled} type="time" value={data?.EndTime} onChange={(e) => handleChange(e.target.value, 'endtime')} />
                        </div>
                    </div>
                    <div className="data-section">
                        <div className="section-line"></div>
                        <table>
                            <tbody>
                                {counter?.map((ele, index) => (<div key={index}> <tr>
                                    <td>
                                        <div className="input-container">

                                            <input disabled type="time" value={ele.Time} /><div className="input-label">
                                                Time
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="input-container">

                                            <input disabled={disabled} type="number" value={ele.Counter} onChange={(e) => handleChangeCounter(e.target.value, index, 'counter')} /><div className="input-label">
                                                Counter
                                            </div>
                                        </div>
                                    </td>{(index == 0) ? null : (<td>
                                        <div className="inputs-container">
                                            <div className="input-container">
                                                <input disabled={disabled} type="number" value={ele.Damage?.Material} onChange={(e) => handleChangeCounter(e.target.value, index, 'material')} />
                                                <div className="tiny-label">Material</div>
                                            </div>
                                            <div className="input-container">
                                                <input disabled={disabled} type="number" value={ele.Damage?.Machine} onChange={(e) => handleChangeCounter(e.target.value, index, 'machine')} />
                                                <div className="tiny-label">Machine</div>
                                            </div>
                                            <div className="input-container">
                                                <input disabled={disabled} type="number" value={ele.Damage?.Clear} onChange={(e) => handleChangeCounter(e.target.value, index, 'clear')} />
                                                <div className="tiny-label">Clear</div>
                                            </div>

                                        </div>
                                    </td>)}

                                </tr>
                                    <tr><div className="section-line"></div></tr>  </div>))}

                            </tbody>
                        </table>

                        <div className="section-line"></div>

                        <div className="input-container">
                            <div className="input-label">
                                No Of packets
                            </div>
                            <input disabled={disabled} type="number" value={data?.NoOfPackets} onChange={(e) => handleChange(e.target.value, 'noofpackets')} />
                        </div>
                        <div className="info-section down-time">
                            <div className="title">Down Times <span className="line"></span></div>
                            <table>
                                {downTimes?.map((ele, index) => (<tr key={index}>
                                    <td>
                                        <div className="input-container">
                                            <input disabled={disabled} type="time" value={downTimes[index].From} onChange={(e) => handleChangeDownTimes(e.target.value, index, 'from')} />
                                            <div className="tiny-label">From</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="input-container">
                                            <input disabled={disabled} type="time" value={downTimes[index].To} onChange={(e) => handleChangeDownTimes(e.target.value, index, 'to')} />
                                            <div className="tiny-label">To</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="input-container">
                                            <input disabled={disabled} type="text" value={downTimes[index].Reason} onChange={(e) => handleChangeDownTimes(e.target.value, index, 'reason')} />
                                            <div className="tiny-label">Reason</div>{index == 0 ? '' : (<button className="delete" onClick={() => removeItem(index)}>{X}</button>)}
                                        </div>

                                    </td>
                                </tr>

                                ))}
                                {!disabled ? (
                                    <tr>
                                        <div className="plus-button">
                                            <div className="line"></div>
                                            <button onClick={() => handlePlusButton()}>{plus}</button>
                                        </div> </tr>) : null}
                                <tr>
                                    <div className="section-line"></div>
                                </tr>
                            </table>
                        </div>
                        <div className="info-section ">
                            <div className="title">Engineering Parameters <span className="line"></span></div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className="info-text">Pre Heater Temp </div>
                                        </td>
                                        <td>
                                            <div className="input-container">
                                                <input disabled={disabled} type="text" value={data?.EngineeringParameters?.PreHeaterTemp?.Specified} onChange={(e) => handleChange(e.target.value, `preheaterspecified`)} />
                                                <div className="tiny-label">Specified</div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="input-container">
                                                <input disabled={disabled} type="text" value={data?.EngineeringParameters?.PreHeaterTemp?.Actual} onChange={(e) => handleChange(e.target.value, `preheateractual`)} />
                                                <div className="tiny-label">Actual</div>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>  <div className="section-line"></div></tr>


                                    <tr>
                                        <td colSpan={3}>Zone Temperature</td>
                                    </tr>
                                    {zoneTemp?.map((ele, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <div className="info-text">{ele?.Zone} </div>
                                                </td>
                                                <td>
                                                    <div className="input-container">
                                                        <input disabled={disabled} type="text" value={ele?.Specified} onChange={(e) => handleChangeZoneTemp(e.target.value, index, 'zone-specified')} />
                                                        <div className="tiny-label">Specified</div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="input-container">
                                                        <input disabled={disabled} type="text" value={ele?.Actual} onChange={(e) => handleChangeZoneTemp(e.target.value, index, 'zone-actual')} />
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

                                    <tr>
                                        <div className="section-line"></div>
                                    </tr>

                                    {
                                        parameters?.map((ele, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        <div className="info-text">{ele.Parameter}</div>
                                                    </td>
                                                    <td>
                                                        <div className="input-container">
                                                            <input disabled={disabled} type="text" value={ele.Specified} onChange={(e) => handleChangeParameters(e.target.value, index, 'specified')} />
                                                            <div className="tiny-label">Specified</div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="input-container">
                                                            <input disabled={disabled} type="text" value={ele.Actual} onChange={(e) => handleChangeParameters(e.target.value, index, 'actual')} />
                                                            <div className="tiny-label">Actual</div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {disabled && edit ? (<div className="edit-data" onClick={() => toggleDisable()}>{pencil}</div>) : null}
               {disabled && data.Status == 'Active' ?( <div className="input-container">
                <div className="buttons">
                    <button className="finish-btn" onClick={()=> setViewModal(true)}>Finish Report</button>
                </div>
                </div>): null}
                {!disabled ? (<div className="input-container">
                    <div className="buttons">
                        <button onClick={() => handleSubmit()}>Save</button>
                        <button style={{ background: 'var(--red)' }} onClick={() => { setDisabled(true); navigate(-1) }} >Discard</button>
                    </div>
                </div>
                ) : null}
            </div>
        </React.Fragment>
    );
};

export default ProductionView;
