const router = require("express").Router();
const validate = require("express-validation");
const authenticate = require("../util/authenticate");
const permit = require("../util/permission");

const worksController = require("./controller");

router.use(authenticate);

const permitReadAll = permit("work", ["readAll"]);
router.route("/").get(permitReadAll, worksController.getWorks);

const permitRead = permit("work", ["read"]);
router.route("/:id").get(permitRead, worksController.getWorkId);

const permitCreate = permit("work", ["create"]);
router.route("/").post(permitCreate, worksController.addNew);

const permitUpdate = permit("work", ["update"]);
router.route("/:id").put(permitUpdate, worksController.updateWorks);

router.route("/result").post(permitUpdate, worksController.answer);

const permitDelete = permit("work", ["delete"]);
router.route("/:id").delete(permitDelete, worksController.deleteWorks);

module.exports = router;
