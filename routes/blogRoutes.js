const express = require("express");
const {
  getBlogs,
  newBlog,
  updateBlog,
  getBlogById,
  deleteBlog,
} = require("../controllers/blogControllers");
const { hasAuthorization } = require("../controllers/adminControllers");

const router = express.Router();

router.get("/", getBlogs);
router.post("/", hasAuthorization, newBlog);
router.put("/:blogId", hasAuthorization, updateBlog);
router.delete("/:blogId", hasAuthorization, deleteBlog);
router.get("/:blogId", getBlogById);

router.param("blogId", getBlogById);

module.exports = router;
