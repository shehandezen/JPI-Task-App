import React from 'react'
import '../css/componentStyles/adddailyproduction.css'

const AddDailyProduction = () => {
    return (
        <React.Fragment>
            <div className="production-container">
                <div className="title">
                    Daily Production
                    <span className="line"></span>
                </div>

                <div className="inputs-container">
                    <div className="input-container">
                        <div className="input-label">Date</div>
                        <input type="Date" placeholder='Date' />
                    </div>
                    <div className="input-container">
                        <div className="input-label">Shift</div>
                        <input type="text" placeholder='Shift' />
                    </div>
                    <div className="input-container">
                        <div className="input-label">Supervisor </div>
                        <input type="text" placeholder='Supervisor' />
                    </div>

                </div>
                <div className="check-box-container">
                    <div className="input-label">Planned Machines</div>
                    <div className="check-boxs">
                        <div className="check-box">
                            <input type="checkbox" />
                            <div className="check-box-name">Im 01</div>
                        </div>
                        <div className="check-box">
                            <input type="checkbox" />
                            <div className="check-box-name">Im 01</div>
                        </div>
                        <div className="check-box">
                            <input type="checkbox" />
                            <div className="check-box-name">Im 01</div>
                        </div>
                        <div className="check-box">
                            <input type="checkbox" />
                            <div className="check-box-name">Im 01</div>
                        </div>
                        <div className="check-box">
                            <input type="checkbox" />
                            <div className="check-box-name">Im 01</div>
                        </div>
                        <div className="check-box">
                            <input type="checkbox" />
                            <div className="check-box-name">Im 01</div>
                        </div>
                        <div className="check-box">
                            <input type="checkbox" />
                            <div className="check-box-name">Im 01</div>
                        </div>
                        <div className="check-box">
                            <input type="checkbox" />
                            <div className="check-box-name">Im 01</div>
                        </div>
                        <div className="check-box">
                            <input type="checkbox" />
                            <div className="check-box-name">Im 01</div>
                        </div>
                        <div className="section-line"></div>
                        <div className="check-box">
                            <input type="checkbox" />
                            <div className="check-box-name">Im 01</div>
                        </div>
                        <div className="check-box">
                            <input type="checkbox" />
                            <div className="check-box-name">Im 01</div>
                        </div>
                        <div className="check-box">
                            <input type="checkbox" />
                            <div className="check-box-name">Im 01</div>
                        </div>
                        <div className="check-box">
                            <input type="checkbox" />
                            <div className="check-box-name">Im 01</div>
                        </div>

                    </div>
                    <div className="input-container">
                        <button>Create</button>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}

export default AddDailyProduction