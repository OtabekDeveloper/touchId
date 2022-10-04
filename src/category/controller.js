const { ErrorHandler } = require("../util/error");
const Category = require("./model");

module.exports = {
  findAll: async function (req, res, next) {
    try {
      let docs = await Category.find({});
      if (!docs) {
        return res.status(400).send("Categorys not found");
      }
      return res.status(200).json(docs);
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to get Categorys", "E181"));
    }
  },

  findOne: async function (req, res, next) {
    try {
      const doc = await Category.findById(req.params.id).exec();
      if (!doc) throw new Error();
      return res.status(200).json(doc);
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to get Category", "E182"));
    }
  },

  addNew: async function (req, res, next) {
    try {
      const newCategory = new Category(req.body);
      const doc = await newCategory.save();
      if (!doc) throw new Error();
      return res.status(200).json(doc);
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to add new Category", "E183"));
    }
  },

  updateOne: async function (req, res, next) {
    try {
      const doc = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      }).exec();
      if (!doc) throw new Error();
      return res.status(200).json(doc);
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to update Category", "E184"));
    }
  },

  deleteOne: async function (req, res, next) {
    try {
        const doc = await Category.findByIdAndDelete(req.params.id).exec();
        if (!doc) throw new Error();
        return res.status(200).json({ _id: doc._id });
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to delete Category", "E185"));
    }
  },
};
