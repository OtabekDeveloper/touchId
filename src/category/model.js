const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, minlength: 3, maxlength: 100 },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Category", CategorySchema);
