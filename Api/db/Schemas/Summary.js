const mongoose = require("mongoose");

const Summary = new mongoose.Schema({
  Date: {
    required: true,
    type: String,
  },
  Shift: {
    required: true,
    type: String,
  },
  Supervisor: {
    required: true,
    type: String,
  },
  Data: [
    {
      MachineNo: String,
      ProductName: String,
      CycleTime: String,
      HourlyTarget: String,
      PlannedQty: String,
      AcceptedQty: String,
      DownTime: String,
      MaterialDamages: String,
      MachineDamages: String,
      Operator: String,
      Weight: String,
      NoOfCavitiesStandard: String,
      NoOfCavitiesUsed: String,
    },
  ],
});

module.exports = mongoose.model("Summary", Summary);
