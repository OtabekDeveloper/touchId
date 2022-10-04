const { ErrorHandler } = require("../util/error");
const Rank = require("./model");

module.exports = {
  findAll: async function (req, res, next) {
    try {
      let docs = await Rank.find({});
      if (!docs) {
        return res.status(400).send("Ranks not found");
      }
      return res.status(200).json(docs);
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to get Ranks", "E181"));
    }
  },

  findOne: async function (req, res, next) {
    try {
      const doc = await Rank.findById(req.params.id).exec();
      if (!doc) throw new Error();
      return res.status(200).json(doc);
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to get Rank", "E182"));
    }
  },

  addNew: async function (req, res, next) {
    try {
      const newRank = new Rank(req.body);
      const doc = await newRank.save();
      if (!doc) throw new Error();
      return res.status(200).json(doc);
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to add new Rank", "E183"));
    }
  },

  updateOne: async function (req, res, next) {
    try {
      const doc = await Rank.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      }).exec();
      if (!doc) throw new Error();
      return res.status(200).json(doc);
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to update Rank", "E184"));
    }
  },

  deleteOne: async function (req, res, next) {
    try {
        const doc = await Rank.findByIdAndDelete(req.params.id).exec();
        if (!doc) throw new Error();
        return res.status(200).json({ _id: doc._id });
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to delete Rank", "E185"));
    }
  },
};