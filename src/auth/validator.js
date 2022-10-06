const Joi = require("@hapi/joi");

module.exports = {
  login: {
    body: {
      phone: Joi.string().required(),
      password: Joi.string().min(5).max(50).required(),
    },
  },

  // logout: {
  //   params: {
  //     id: Joi.string().required(),
  //   },
  // },

  // smsLogin: {
  //   phone: Joi.string().min(9).max(9).required(),
  // },

  // smsVerify: {
  //   phone: Joi.string().min(9).max(9).required(),
  //   verifyCode: Joi.string()
  //     .min(4)
  //     .max(4)
  //     .regex(new RegExp("d{4}/g"))
  //     .required(),
  //   macAddress: Joi.string().required(),
  // },
};
