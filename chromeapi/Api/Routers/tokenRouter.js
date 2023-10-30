const express = require("express");
const authController = require("../Controllers/authController");
const router = express.Router();
router.get("/allToken", authController.allToken);
router.post("/createToken", authController.addToken);
module.exports = router;