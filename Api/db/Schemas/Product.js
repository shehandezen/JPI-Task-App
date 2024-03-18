const mongoose = require("mongoose")

const Product = new mongoose.Schema({
  machineNo: String,
  productName: String,
  productCode: String,
  jobNo: Number,
  customer: String,
  hourlyTarget: Number,
  cycleTime: Number,
  itemWeight: Number,
  availableCavities:Number,
  usingCavities: Number,
  planningQty: Number,
  proceedQty: Number,
  isDoubleBag: Boolean,
  isCardboardRequired: Boolean,
  isSeconBagRequired: Boolean,
  bagType: String,
  bagSize: {
    Size: String,
    Code: String
  },
  polytheneCode: String,
  secondBagSize:  {
    Size: String,
    Code: String
  },
  polytheneCodeSecond: String,
  cardboardSize: String,
  cardboardCode: String,
  isLabelRequired: String,
  labelName:  {
    Size: String,
    Code: String
  },
  labelCode: String,
  materialName: String,
  masterbatch: String,
  totalhours: Number,
  status: String,
})

module.exports = mongoose.model("Product", Product)