const express = require("express");
const { register, registerActivate, login } = require("../controllers/auth");

const { userRegisterValidator, userLoginValidator } = require("../validators/auth");
const { runValidation } = require("../validators");

const router = express.Router();

router.post("/register", userRegisterValidator, runValidation, register);
router.post("/register/activate", registerActivate);

router.post("/login", userLoginValidator, runValidation, login);



module.exports = router;
