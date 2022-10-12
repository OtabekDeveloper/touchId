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
  .route("/patametr")
  .post(permitCreate, validate(Validator.addNewParam), Controller.addNewParam);


const permitUpdate = permit("device", ["update"]);
router
  .route("/:id")
  .put(permitUpdate, validate(Validator.updateOne), Controller.updateOne);

  router
  .route("/parametr/:id")
  .put(permitUpdate, validate(Validator.updateOne), Controller.updateOne);

const permitDelete = permit("device", ["delete"]);
router
  .route("/:id")
  .delete(permitDelete, validate(Validator.deleteOne), Controller.deleteOne);

module.exports = router;
