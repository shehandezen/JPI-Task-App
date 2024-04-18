const mongoose = require("mongoose");

const Chart = new mongoose.Schema({
    Date: {
        Year: String,
        Month: String,
    },
    ProductionEfficiency:[{
        Day: String,
        Shift: String,
        Efficiency: Number
    }],
    ProductionHoursUtilization:[{
        Day: String,
        Shift: String,
        Utilization: Number
    }]
})

module.exports = mongoose.model("Chart", Chart)