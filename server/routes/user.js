const express = require("express");

const router = express.Router();

//import middleware
const { authMiddleware, requireSigin, adminMiddleware } = require("../controllers/auth");


// import controllers
const {read} = require('../controllers/user')

router.get('/user', requireSigin, authMiddleware, read)
router.get('/admin', requireSigin, adminMiddleware, read)


module.exports = router;
