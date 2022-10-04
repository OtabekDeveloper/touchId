const { ErrorHandler } = require("../util/error");
const User = require("./model");

module.exports = {
  findAll: async function (req, res, next) {
    try {
      const {role} = req.body
      const docs = await User.find({ role: role }).exec();
      if (!docs) throw new Error();
      return res.status(200).json(docs);
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to get Users " + err));
    }
  },

  findOne: async function (req, res, next) {
    try {
      const doc = await User.findById(req.params.id).exec();
      if (!doc) throw new Error();
      return res.status(200).json(doc);
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to get User " + err));
    }
  },

  addNew: async function (req, res, next) {
    try {
      const newUser = new User(req.body);
      const doc = await newUser.save();
      if (!doc) throw new Error();
      return res.status(200).json(doc);
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to add new User " + err));
    }
  },

  updateOne: async function (req, res, next) {
    try {
      const doc = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      }).exec();
      if (!doc) throw new Error();
      return res.status(200).json(doc);
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to update User"));
    }
  },

  deleteOne: async function (req, res, next) {
    try {
      const doc = await User.findByIdAndDelete(req.params.id).exec();
      if (!doc) throw new Error();
      return res.status(200).json({ _id: doc._id });
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to delete User"));
    }
  },
};
