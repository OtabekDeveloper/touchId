const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 4, maxlength: 50 },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Room", RoomSchema);