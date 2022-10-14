const Joi = require("@hapi/joi");

module.exports = {
  addNew: {
    body: {
      title: Joi.string().min(3).max(100).required(),
    },
  },

  addNewParam : {
    body : {
      subCategory : Joi.string().required()
    }
  },

  updateOne: {
    params: {
      id: Joi.string().required(),
    },
    body: {
      title: Joi.string().min(3).max(100).required(),
    },
  },

  deleteOne: {
    params: {
      id: Joi.string().required(),
    },
  },
};
