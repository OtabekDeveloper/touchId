const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});
const express = require("express");
const mongoose = require("mongoose");
const Promise = require("bluebird");
const debug = require("debug")("node-server:index");
const util = require("util");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const { ErrorHandler, handleError } = require("./util/error");
const winston = require("./util/winston.logger");
const appRouter = require("./router");
const Telegram = require("./telegram/telegram")
// const { Telegram } = require("./telegram/telegram2");

// main app
const app = express();

/// new commit
const PORT = process.env.PORT;

// mongoose
mongoose.connect(process.env.MONGO_HOST);
// mongoose.connect(mongoDB, { useNewUrlParser: true });

mongoose.connection.on("error", () => {
  throw new ErrorHandler(
    400,
    `Unable to connect to database: ${process.env.MONGO_HOST}`
  );
});

// print mongoose logs in dev env
if (process.env.MONGOOSE_DEBUG) {
  mongoose.set("debug", (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}

// Logger
app.use(morgan("combined", { stream: winston.stream }));

// security setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

Telegram();

app.use("/api", appRouter);

const imagePath = path.join(__dirname, "../uploads/");
// const imagePath = "./uploads/applications";
app.use("/uploads/", express.static(imagePath));

// const root = path.join(__dirname, "../public/build");

// app.use(express.static(root));
app.get("/*", (req, res) => {
  res.sendFile("index.html", { root });
});

// error handler
app.use((err, req, res, next) => {
  handleError(err, res);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`server started on port ${PORT}`);
});

module.exports = app;
