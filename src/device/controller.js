const { ErrorHandler } = require("../util/error");
const Device = require("./model");

module.exports = {
  findAll: async function (req, res, next) {
    try {
      let docs = await Device.find({});
      if (!docs) {
        return res.status(400).send("Devices not found");
      }
      return res.status(200).json(docs);
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to get Devices", "E181"));
    }
  },

  findOne: async function (req, res, next) {
    try {
      const doc = await Device.findById(req.params.id).exec();
      if (!doc) throw new Error();
      return res.status(200).json(doc);
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to get Device", "E182"));
    }
  },

  addNew: async function (req, res, next) {
    try {
      const newDevice = new Device(req.body);
      const doc = await newDevice.save();
      if (!doc) throw new Error();
      return res.status(200).json(doc);
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to add new Device", "E183"));
    }
  },

  updateOne: async function (req, res, next) {
    try {
      const doc = await Device.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      }).exec();
      if (!doc) throw new Error();
      return res.status(200).json(doc);
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to update Device", "E184"));
    }
  },

  deleteOne: async function (req, res, next) {
    try {
        const doc = await Device.findByIdAndDelete(req.params.id).exec();
        if (!doc) throw new Error();
        return res.status(200).json({ _id: doc._id });
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to delete Device", "E185"));
    }
  },
};
