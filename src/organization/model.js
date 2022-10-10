const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 3, maxlength: 256 },
    fullname: { type: String, default: null, minlength: 3,  maxlength: 256 },
    login : { type : String , maxlength : 9 },
    password : { type : String , maxlength :20 , min: 4 }
  },
  { versionKey: false }
);

module.exports = mongoose.model("Organization", OrganizationSchema);
