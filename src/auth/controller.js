const jwt = require("jsonwebtoken");
const bluebird = require("bluebird");
bluebird.promisifyAll(jwt);
const { ErrorHandler } = require("../util/error");
const User = require("../user/model");

module.exports = {
  login: async function (req, res, next) {
    try {
      const doc = await User.findOne({ username: req.body.username }).exec();
      if (!doc) return res.status(404).json({ error: "user not found" });
      if (doc.password === req.body.password) {
        const token = jwt.sign(
          {
            _id: doc._id,
            title: {
              firstName: doc.firstName,
              lastName: doc.lastName,
              middleName: doc.middleName,
            },
            role: doc.role,
          },
          process.env.TOKEN_SECRET_KEY,
          { algorithm: "HS256", expiresIn: process.env.TOKEN_ADMIN_EXPIRESIN }
        );
        return res.status(200).json({ token });
      }

      return res.status(403).json({ error: "password error" });
    } catch (err) {
      return next(new ErrorHandler(403, "Forbidden access"));
    }
  },
};
