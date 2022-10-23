const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, minlength: 3, maxlength: 200 },
    lastName: { type: String, required: true, minlength: 3, maxlength: 200 },
    middleName: { type: String, required: true, minlength: 3, maxlength: 200 },
    password: { type: String, maxlength: 100 },
    role: { type: String, required: true, minlength: 4, maxlength: 50 },
    phone: {type: String, minlength: 9, maxlength: 9},
    room: { type: mongoose.Schema.Types.ObjectId, default : null },
    rank: { type: mongoose.Schema.Types.ObjectId, default : null },
    department: { type: mongoose.Schema.Types.ObjectId, default : null },
    organization : { type: mongoose.Schema.Types.ObjectId, default : null },
    chatId :  {type: String, default : null}
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("user", UserSchema);
