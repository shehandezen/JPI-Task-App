const mongoose = require("mongoose")

const MouldChange = new mongoose.Schema({
    MachineNo: String,
    Date:  String,
    PreviousProduct: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    NextProduct: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    PlannedTime: Number,
    Technician1: String,
    Technician2: String,
    ActualTime: Number,
    StartTime: String,
    EndTime: String,
    Note: String
})

module.exports = mongoose.model("MouldChange", MouldChange)