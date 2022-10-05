const router = require("express").Router();
const validate = require("express-validation");
const authenticate = require("../util/authenticate");
const permit = require("../util/permission");

const ordersController = require("./controller");

router.use(authenticate);

const permitReadAll = permit("order", ["readAll"]);
router.route("/").get(permitReadAll, ordersController.getOrders);

const permitRead = permit("order", ["read"]);
router.route("/:id").get(permitRead, ordersController.getWorkId);

const permitCreate = permit("order", ["create"]);
router.route("/").post(permitCreate, ordersController.addNew);

const permitUpdate = permit("order", ["update"]);
router.route("/:id").put(permitUpdate, ordersController.updateOrders);

const permitDelete = permit("order", ["delete"]);
router.route("/:id").delete(permitDelete, ordersController.deleteOrders);

module.exports = router;
