const { ErrorHandler } = require("../util/error");
const Room = require("./model");

module.exports = {
  findAll: async function (req, res, next) {
    try {
      let docs = await Room.find({});
      if (!docs) {
        return res.status(400).send("Rooms not found");
      }
      return res.status(200).json(docs);
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to get Rooms", "E181"));
    }
  },

  findOne: async function (req, res, next) {
    try {
      const doc = await Room.findById(req.params.id).exec();
      if (!doc) throw new Error();
      return res.status(200).json(doc);
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to get Room", "E182"));
    }
  },

  addNew: async function (req, res, next) {
    try {
      const newRoom = new Room(req.body);
      const doc = await newRoom.save();
      if (!doc) throw new Error();
      return res.status(200).json(doc);
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to add new Room", "E183"));
    }
  },

  updateOne: async function (req, res, next) {
    try {
      const doc = await Room.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      }).exec();
      if (!doc) throw new Error();
      return res.status(200).json(doc);
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to update Room", "E184"));
    }
  },

  deleteOne: async function (req, res, next) {
    try {
        const doc = await Room.findByIdAndDelete(req.params.id).exec();
        if (!doc) throw new Error();
        return res.status(200).json({ _id: doc._id });
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to delete Room", "E185"));
    }
  },
};
