const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, minlength: 4, maxlength: 50 },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Department", DepartmentSchema);
