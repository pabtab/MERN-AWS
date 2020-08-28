const express = require("express");
const { register, registerActivate, login, requireSigin, forgotPassord, resetPassword } = require("../controllers/auth");

const { userRegisterValidator, userLoginValidator, forgotPasswordValidator, resetPasswordValidator } = require("../validators/auth");
const { runValidation } = require("../validators");

const router = express.Router();

router.post("/register", userRegisterValidator, runValidation, register);
router.post("/register/activate", registerActivate);

router.post("/login", userLoginValidator, runValidation, login);
router.put("/forgot-password", forgotPasswordValidator, runValidation, forgotPassord);
router.put("/reset-password", resetPasswordValidator, runValidation, resetPassword);



/* router.get('/secret', requireSigin, (req, res) => {
  res.json({
    data: 'This is a secret for users only'
  })
}) */


module.exports = router;
