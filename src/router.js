const router = require("express").Router();
const adminRouter = require("./admin/router");
const authRouter = require("./auth/router");
const userRouter = require("./user/router");
const regionRouter = require("./region/router");
const categoryRouter = require("./category/router");
const objectRouter = require("./object/router");
const sectorRouter = require("./sector/router");
const worksRouter = require("./works/router");

router.use("/admin", adminRouter);
router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/regions", regionRouter);
router.use("/works", worksRouter);
router.use("/categories", categoryRouter);
router.use("/objects", objectRouter);
router.use("/sectors", sectorRouter);

module.exports = router;
