const express = require("express");
const {
  registerUser,
  authUser,
  allUser,
} = require("../controllers/userControllers");
const { protect } = require("../middlerware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, allUser);
router.route("/").post(registerUser);
router.post("/login", authUser);


module.exports = router;
