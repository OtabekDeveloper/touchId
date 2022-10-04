const mongoose = require("mongoose");

const RankSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 4, maxlength: 50 },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Rank", RankSchema);
