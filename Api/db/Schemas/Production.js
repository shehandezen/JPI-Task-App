const mongoose = require("mongoose")

const Production = new mongoose.Schema({
    MachineNo: String,
        Date: String,
        Shift: String,
        Supervisor: String,
        Operator: String,
        Product:  {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
        StartTime: String,
        EndTime: String,
        Counter: [{
            Time: String,
            Counter: Number,
            Damage: {
                Material: Number,
                Machine: Number,
                Clear: Number
            }
        },
        ],
        NoOfPackets: Number,
        DownTimes: [{
            From: String,
            To: String,
            Reason: String
        }],
        EngineeringParameters: {
            PreHeaterTemp: {
                Specified: Number,
                Actual: Number
            },
            ZoneTemp: [
                {
                    Zone: String,
                    Specified: Number,
                    Actual: Number
                },
              
            ],

            Parameters: [
                {
                    Parameter: String,
                    Specified: Number,
                    Actual: Number
                },
               ]


        }
})

module.exports = mongoose.model("Production", Production)