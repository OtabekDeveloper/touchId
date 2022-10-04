const router = require("express").Router();
const validate = require("express-validation");
const Validator = require("./validator");
const Controller = require("./controller");

router.route("/login").post(validate(Validator.login), Controller.login);

// router
//   .route("/sms-login")
//   .post(validate(Validator.smsLogin), Controller.smsLogin);

// router
//   .route("/sms-verify")
//   .post(validate(Validator.smsVerify), Controller.smsVerify);

module.exports = router;
