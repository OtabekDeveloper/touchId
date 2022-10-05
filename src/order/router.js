const router = require("express").Router();
const validate = require("express-validation");
const authenticate = require("../util/authenticate");
const permit = require("../util/permission");

const ordersController = require("./controller");

router.use(authenticate);

const permitReadAll = permit("work", ["readAll"]);
router.route("/").get(permitReadAll, ordersController.getOrders);

const permitRead = permit("work", ["read"]);
router.route("/:id").get(permitRead, ordersController.getWorkId);

const permitCreate = permit("work", ["create"]);
router.route("/").post(permitCreate, ordersController.addNew);

const permitUpdate = permit("work", ["update"]);
router.route("/:id").put(permitUpdate, ordersController.updateOrders);

const permitDelete = permit("work", ["delete"]);
router.route("/:id").delete(permitDelete, ordersController.deleteOrders);

module.exports = router;
