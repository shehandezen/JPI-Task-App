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
      id: mongoose.SchemaTypes.ObjectId
    },
  ],
});

module.exports = mongoose.model("ProductionReport", ProductionReport);
