const router = require("express").Router();
const adminRouter = require("./admin/router");
const authRouter = require("./auth/router");
const userRouter = require("./user/router");
const categoryRouter = require("./category/router");
const demartmentRouter = require("./department/router")
const orderRouter = require("./order/router")
const organizationRouter = require("./organization/router")
const rankRouter = require("./rank/router")
const roomRouter = require("./room/router")
const deviceRoter  = require("./device/router")

router.use("/admin", adminRouter); //
router.use("/auth", authRouter); //
router.use("/users", userRouter); //
router.use("/departments", demartmentRouter); //
router.use("/orders", orderRouter);
router.use("/organizations", organizationRouter); //
router.use("/ranks", rankRouter); //
router.use("/rooms", roomRouter); //
router.use("/categorys", categoryRouter); //
router.use("/devices", deviceRoter);

module.exports = router;
