const express = require("express");
const {
  getItems,
  newItem,
  updateItem,
  getItemById,
  deleteItem,
} = require("../controllers/portfolioItemsController");
const { hasAuthorization } = require("../controllers/adminControllers");

const router = express.Router();

router.get("/", getItems);
router.post("/", hasAuthorization, newItem);
router.put("/:itemId", hasAuthorization, updateItem);
router.delete("/:itemId", hasAuthorization, deleteItem);
router.get("/:itemId", getItemById);

router.param("itemId", getItemById);

module.exports = router;
