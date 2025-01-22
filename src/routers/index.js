const express = require("express");

const authRoutes = require("./auth");
const userRoutes = require("./user");
const categoryRoutes = require("./category");
const productRoutes = require("./product");
const { verifyApiKey } = require("../auth/verifyAuth");

const router = express.Router();

// veryfy auth middlewares
// router.use(verifyApiKey);

//router middlewares

router.use("/", authRoutes);
router.use("/", userRoutes);
router.use("/", categoryRoutes);
router.use("/", productRoutes);

exports.router = router;
