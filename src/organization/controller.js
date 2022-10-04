const { ErrorHandler } = require("../util/error");
const Organization = require("./model");

module.exports = {
  findAll: async function (req, res, next) {
    try {
      const docs = await Organization.find({}).exec();
      if (!docs) throw new Error();
      return res.status(200).json(docs);
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to get Organizations", "E171"));
    }
  },

  findOne: async function (req, res, next) {
    try {
      const doc = await Organization.findById(req.params.id).exec();
      if (!doc) throw new Error();
      return res.status(200).json(doc);
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to get Organization", "E172"));
    }
  },

  addNew: async function (req, res, next) {
    try {
      const newOrganization = new Organization(req.body);
      const doc = await newOrganization.save();
      if (!doc) throw new Error();
      return res.status(200).json(doc);
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to add new Organization", "E173"));
    }
  },

  updateOne: async function (req, res, next) {
    try {
      const doc = await Organization.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      }).exec();
      if (!doc) throw new Error();
      return res.status(200).json(doc);
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to update Organization", "E174"));
    }
  },

  deleteOne: async function (req, res, next) {
    try {
      const doc = await Organization.findByIdAndDelete(req.params.id).exec();
      if (!doc) throw new Error();
      return res.status(200).json({ _id: doc._id });
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to delete Organization", "E175"));
    }
  },
};
