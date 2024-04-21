const mongoose = require("mongoose");

const Report = new mongoose.Schema({
    Date: {
        Year: String,
        Month: String,
        Day: String,
        Shift: String,
    },
    Supervisor: String,
    Summary: {
        IMEfficiency: String,
        BMEfficiency: String,
        IMLEfficiency: String,
        IBMEfficiency: String
    },
    Reports: [{
        Machine: String,
        Report: {type: mongoose.Schema.Types.ObjectId, ref: 'Production'},
        Summary: {
            Product:  {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
            PlannedQty: String,
            ProccedQty: String,
            Damages:{
                Material: String,
                Machine: String,
                Clear: String
            },
           ProductionHours: String,
           UtilizedHours: String,
           NoOfPackets: String,
           Downtimes:[{
            From: String,
            To: String,
            Duration: String,
            Reason: String
           }] ,
           Efficiency: String,
           ProductionHoursUtilization: String
        }
    }]
})

module.exports = mongoose.model("Report", Report)