const { ErrorHandler } = require("../util/error");
const {Device , Parametr} = require("./model");

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

  getParam: async function (req, res, next) {
    try {
      let parametrs = await Parametr.find({subCategory: req.body.subCategory})
      if (!parametrs) throw new Error();
      return res.status(200).json(parametrs);
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to get parametrs", "E183"));
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

  addNewParam: async function (req, res, next) {
    try {
      const {subCategory , parametrs , category} = req.body
      let doc;
      if(category){
        let result = await Device.create({
          title : subCategory,
          parent : category
        })
        for(let i of parametrs){
          let body = {
            category : category,
            subCategory : result._id,
            parametr : i
          }
          doc =  await Parametr.create(body)
        }
      }else {
       const sub = await Device.findById(subCategory)
      for(let i of parametrs){
        let body = {
          category : sub.parent,
          subCategory : subCategory,
          parametr : i
        }
        doc = await Parametr.create(body)
      }
     }
      if (!doc) throw new Error();
      return res.status(200).json(doc);
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to add new Parametr", "E183"));
    }
  },

  updateOneParam: async function (req, res, next) {
    try {
      const doc = await Parametr.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      }).exec();
      if (!doc) throw new Error();
      return res.status(200).json(doc);
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to update Parametr", "E184"));
    }
  },

  deleteOneParametr: async function (req, res, next) {
    try {
        const doc = await Parametr.findByIdAndDelete(req.params.id).exec();
        if (!doc) throw new Error();
        return res.status(200).json({ _id: doc._id });
    } catch (err) {
      return next(new ErrorHandler(400, "Failed to delete Parametr", "E185"));
    }
  },
};
