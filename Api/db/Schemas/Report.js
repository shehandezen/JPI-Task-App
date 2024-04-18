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
        IMEfficiency: Number,
        BMEfficiency: Number,
        IMLEfficiency: Number,
        IBMEfficiency: Number
    },
    Reports: [{
        Machine: String,
        Report: {type: mongoose.Schema.Types.ObjectId, ref: 'Production'},
        Summary: {
            Product:  {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
            PlannedQty: Number,
            ProccedQty: Number,
            Damages:{
                Material: Number,
                Machine: Number,
                Clear: Number
            },
           PlannedHours: Number,
           UtilizedHours: Number,
           NoOfPackets: Number,
           Downtimes:[{
            From: String,
            To: String,
            Duration: Number,
            Reason: String
           }] 
        }
    }]
})

module.exports = mongoose.model("Report", Report)