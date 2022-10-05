const router = require("express").Router();
const validate = require("express-validation");
const authenticate = require("./../util/authenticate");
const permit = require("./../util/permission");

const Validator = require("./validator");
const Controller = require("./controller");

router.use(authenticate);

const permitReadAll = permit("room", ["readAll"]);
router.route("/").get(permitReadAll, Controller.findAll);

const permitRead = permit("room", ["read"]);
router.route("/:id").get(permitRead, Controller.findOne);

const permitCreate = permit("room", ["create"]);
router
  .route("/")
  .post(permitCreate, validate(Validator.addNew), Controller.addNew);

const permitUpdate = permit("room", ["update"]);
router
  .route("/:id")
  .put(permitUpdate, validate(Validator.updateOne), Controller.updateOne);

const permitDelete = permit("room", ["delete"]);
router
  .route("/:id")
  .delete(permitDelete, validate(Validator.deleteOne), Controller.deleteOne);

module.exports = router;
