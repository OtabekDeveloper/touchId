const router = require("express").Router();
const validate = require("express-validation");
const authenticate = require("./../util/authenticate");
const permit = require("./../util/permission");

const Validator = require("./validator");
const Controller = require("./controller");

router.use(authenticate);

const permitReadAll = permit("organization", ["readAll"]);
router.route("/").get(permitReadAll, Controller.findAll);

const permitRead = permit("organization", ["read"]);
router.route("/:id").get(permitRead, Controller.findOne);

const permitCreate = permit("organization", ["create"]);
router.route("/").post(permitCreate, validate(Validator.addNew), Controller.addNew);

const permitUpdate = permit("organization", ["update"]);
router.route("/:id").put(permitUpdate, validate(Validator.updateOne), Controller.updateOne);

const permitDelete = permit("organization", ["delete"]);
router.route("/:id").delete(permitDelete, validate(Validator.deleteOne), Controller.deleteOne);

module.exports = router;
