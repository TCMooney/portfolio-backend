const express = require("express");
const {
  signin,
  signout,
  adminSignup,
} = require("../controllers/adminControllers");

const router = express.Router();

router.post("/adminSignup", adminSignup);
router.post("/signin", signin);
router.get("/signout", signout);

module.exports = router;
