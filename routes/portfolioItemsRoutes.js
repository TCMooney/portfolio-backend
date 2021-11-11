const express = require("express");
const { getItems } = require("../controllers/portfolioItemsController");

const router = express.Router();

router.get("/", getItems);

module.exports = router;
