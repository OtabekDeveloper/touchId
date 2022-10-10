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
    },
    paramets : [Object]
  },
  { versionKey: false }
);

module.exports = mongoose.model("Device", DeviceSchema);
