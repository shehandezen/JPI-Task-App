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
      Product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
      PlannedQty: String,
      AcceptedQty: String,
      DownTime: String,
      MaterialDamages: String,
      MachineDamages: String,
      Operator: String
    },
  ],
});

module.exports = mongoose.model("Summary", Summary);
