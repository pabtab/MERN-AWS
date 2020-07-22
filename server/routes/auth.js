const express = require("express");
const { register } = require("../controllers/auth");

const { userRegisterValidator } = require("../validators/auth");
const { runValidation } = require("../validators");

const router = express.Router();

router.post("/register", userRegisterValidator, runValidation, register);

module.exports = router;
