const express = require("express");
const authController = require("../Controllers/authController");
const router = express.Router();
router.get("/allAccount", authController.allAccount);
router.post("/createAccount", authController.createAccount);
module.exports = router;