const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, minlength: 3, maxlength: 100 },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Room", RoomSchema);
