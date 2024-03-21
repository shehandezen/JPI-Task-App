const mongoose = require("mongoose")

const MouldChange = new mongoose.Schema({
    machineNo: String,
    date:  String,
    previousProduct: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    nextProduct: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    plannedTime: Number,
    technician1: String,
    technician2: String,
    actualTime: Number,
    startTime: String,
    endTime: String,
    note: String
})

module.exports = mongoose.model("MouldChange", MouldChange)