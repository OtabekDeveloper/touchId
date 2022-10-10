const { ErrorHandler } = require("../util/error");
const Department = require("./model");

module.exports = {
  findAll: async function (req, res, next) {
    try {
      let docs = await Department.find({});
      if (!docs) {
        return res.status(400).send("Departments not found");
      }
      return res.status(200).json(docs);
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to get Departments", "E181"));
    }
  },

  findOne: async function (req, res, next) {
    try {
      const doc = await Department.findById(req.params.id).exec();
      if (!doc) throw new Error();
      return res.status(200).json(doc);
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to get Department", "E182"));
    }
  },

  addNew: async function (req, res, next) {
    try {
      const newDepartment = new Department(req.body);
      const doc = await newDepartment.save();
      if (!doc) throw new Error();
      return res.status(200).json(doc);
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to add new Department", "E183"));
    }
  },

  updateOne: async function (req, res, next) {
    try {
      const doc = await Department.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      }).exec();
      if (!doc) throw new Error();
      return res.status(200).json(doc);
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to update Department", "E184"));
    }
  },

  deleteOne: async function (req, res, next) {
    try {
        const doc = await Department.findByIdAndDelete(req.params.id).exec();
        if (!doc) throw new Error();
        return res.status(200).json({ _id: doc._id });
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to delete Department", "E185"));
    }
  },
};
