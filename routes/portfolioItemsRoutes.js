const express = require("express");
const {
  getItems,
  newItem,
  updateItem,
  itemById,
} = require("../controllers/portfolioItemsController");

const router = express.Router();

router.get("/", getItems);
router.post("/", newItem);
router.put("/:itemId", updateItem);

router.param("itemId", itemById);

module.exports = router;
