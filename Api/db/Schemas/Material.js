const mongoose = require("mongoose")

const Material = new mongoose.Schema({
    RawMaterial: [
        {
            MaterialName: String
        }
    ],
    MasterBatch: [
        {
            MasterBatchName: String
        }
    ],
    Polythene: [
        {
            Size: String,
            Code: String        
        }
    ],
    Cardboard: [
        {
            Size: String,
            Code: String        
        }
    ],
    Label: [
        {
            LabelName: String,
            Code: String        
        }
    ]
})

module.exports = mongoose.model("Material", Material)