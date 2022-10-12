const mongoose = require("mongoose");

const DeviceSchema = new mongoose.Schema(
  {
    title : {
      type : String,
      maxlength: 3,
      maxlength : 100
    },
    parent : {
      type : mongoose.Schema.Types.ObjectId, 
      default : null
    }
  },
  { versionKey: false }
);

const ParametrSchema = new mongoose.Schema({
  subCategory : {type: mongoose.Schema.Types.ObjectId, default : null},
  category : {type: mongoose.Schema.Types.ObjectId, default : null},
  parametr : { type : Object , required : true }
})

const Parametr = mongoose.model("Parametr" , ParametrSchema)
const Device = mongoose.model("Device", DeviceSchema);


module.exports = {Device , Parametr}