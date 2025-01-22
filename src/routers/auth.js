const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();

const {
  signup,
  signin,
  signout,
  verifyGoogleToken,
} = require("../controllers/auth");
const { userSignupValidator } = require("../validator");
// const { verifyToken } = require("../middlewares/auth-jwt");

router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);

// router.get("/hidden-content", verifyToken, function (req, res, user) {
//   if (!user) {
//     res.status(403).send({ message: "Invalid JWT Token" });
//   }

//   if (req.user.role === 1) {
//     res.status(200).send({ message: "Ok! U can see content!" });
//   } else {
//     res.status(403).send({ message: "Unauthorised access!" });
//   }
// });

let DB = [];

router.post("/signup-oauth2", async (req, res) => {
  try {
    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);
      console.log("verificationResponse", verificationResponse);
      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }

      const profile = verificationResponse?.payload;

      const user = new User({
        email: profile?.email,
        name: profile?.firstName + profile?.lastName
      });

      console.log(user);

      DB.push(profile);
      console.log("DB", DB);
      res.status(201).json({
        message: "Signup was successful",
        user: {
          firstName: profile?.given_name,
          lastName: profile?.family_name,
          picture: profile?.picture,
          email: profile?.email,
          token: jwt.sign({ email: profile?.email }, "myScret", {
            expiresIn: "1d",
          }),
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred. Registration failed.",
    });
  }
});

module.exports = router;
