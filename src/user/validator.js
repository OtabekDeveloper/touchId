const Joi = require("@hapi/joi");

module.exports = {
  findAll : {
    body : {
      role : Joi.string().required()
    }
  },

  addNew: {
    body: {
      firstName: Joi.string().min(3).max(200).required(),
      middleName: Joi.string().min(3).max(200).required(),
      lastName: Joi.string().min(3).max(200).required(),
      role: Joi.string().required(),
    },
  },

  updateOne: {
    params: {
      id: Joi.string().required(),
    }
  },

  deleteOne: {
    params: {
      id: Joi.string().required(),
    },
  },
};
