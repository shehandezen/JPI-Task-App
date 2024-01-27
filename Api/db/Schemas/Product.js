const mongoose = require("mongoose")

const Product = new mongoose.Schema({
        machineNo: {
            required: true,
            type: String
        },
        productName:  {
            required: true,
            type: String
        },
        productCode: String,
        productImage: String,
        customer: String,
        packageDetails: {
          bagType: String,
          isDoubleBag:  {
            required: true,
            type: Boolean 
        },
          bagSize:  {
            required: true,
            type: String
        },
        otherBagSize : String, 
          itemsPerPacket: Number
        },
        boxes:{
          isRequired:  {
            required: true,
            type: Boolean
        },
          boxSize:  String
        },
        labelDetails: {
          isRequired: Boolean,
          labelName: String,
          labelCode: [String]
        },
        materialDetails: {
          materialName: String,
          masterBatch: String
        },
      
        period: {
          startDate: Date,
          endDate: Date
        },
        isActive: Boolean
})

module.exports = mongoose.model("Product", Product)