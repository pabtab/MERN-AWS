const express = require("express");
const { register, registerActivate } = require("../controllers/auth");

const { userRegisterValidator } = require("../validators/auth");
const { runValidation } = require("../validators");

const router = express.Router();

router.post("/register", userRegisterValidator, runValidation, register);
router.post("/register/activate", registerActivate);


module.exports = router;
