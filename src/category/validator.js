const Joi = require("@hapi/joi");

module.exports = {
  addNew: {
    body: {
      title: Joi.string().min(3).max(100).required(),
    },
  },

  updateOne: {
    params: {
      id: Joi.string().required(),
    },
    body: {
      name: Joi.string().min(3).max(100).required(),
    },
  },

  deleteOne: {
    params: {
      id: Joi.string().required(),
    },
  },
};
