const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SECRET,
      function (err, decoded) {
        if (err) req.user = undefined;
        User.findOne(
          {
            _id: decoded._id,
          },
          { _id: 1, role: 1, name: 1, email: 1 }
        ).exec((err, user) => {
          if (err) {
            res.status(500).send({
              message: err,
            });
          } else {
            req.user = user;
            next();
          }
        });
      }
    );
  } else {
    req.user = undefined;
    next();
  }
};
