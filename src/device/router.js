const router = require("express").Router();
const validate = require("express-validation");
const authenticate = require("./../util/authenticate");
const permit = require("./../util/permission");

const Validator = require("./validator");
const Controller = require("./controller");

router.use(authenticate);

const permitReadAll = permit("device", ["readAll"]);
router.route("/").get(permitReadAll, Controller.findAll);

const permitRead = permit("device", ["read"]);
router.route("/:id").get(permitRead, Controller.findOne);

const permitCreate = permit("device", ["create"]);
router
  .route("/")
  .post(permitCreate, validate(Validator.addNew), Controller.addNew);

router
  .route("/parametr")
  .post(validate(Validator.addNewParam), Controller.addNewParam);

router
  .route("/getParamert")
  .post(validate(Validator.addNewParam), Controller.getParam);


const permitUpdate = permit("device", ["update"]);
router
  .route("/:id")
  .put(permitUpdate, validate(Validator.updateOne), Controller.updateOne);

router
  .route("/updateParametr")
  .post(Controller.updateOneParam);

const permitDelete = permit("device", ["delete"]);
router
  .route("/:id")
  .delete(permitDelete, validate(Validator.deleteOne), Controller.deleteOne);

  router
  .route("/parametr/:id")
  .delete(validate(Validator.deleteOne), Controller.deleteOneParametr);


module.exports = router;
