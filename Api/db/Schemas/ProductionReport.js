const mongoose = require("mongoose");

const ProductionReport = new mongoose.Schema({
  Date: String,
  Shift: String,
  Supervisor: String,
  Status: String,
  Machines: [
    {
      machine: String,
      status: String,
      data: {type: mongoose.Schema.Types.ObjectId, ref: 'Production'}
    },
  ],
});

module.exports = mongoose.model("ProductionReport", ProductionReport);
