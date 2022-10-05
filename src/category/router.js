const router = require("express").Router();
const validate = require("express-validation");
const authenticate = require("./../util/authenticate");
const permit = require("./../util/permission");

const Validator = require("./validator");
const Controller = require("./controller");

router.use(authenticate);

const permitReadAll = permit("category", ["readAll"]);
router.route("/").get(permitReadAll, Controller.findAll);

const permitRead = permit("category", ["read"]);
router.route("/:id").get(permitRead, Controller.findOne);

const permitCreate = permit("category", ["create"]);
router
  .route("/")
  .post(permitCreate, validate(Validator.addNew), Controller.addNew);

const permitUpdate = permit("category", ["update"]);
router
  .route("/:id")
  .put(permitUpdate, validate(Validator.updateOne), Controller.updateOne);

const permitDelete = permit("category", ["delete"]);
router
  .route("/:id")
  .delete(permitDelete, validate(Validator.deleteOne), Controller.deleteOne);

module.exports = router;
