const _ = require("lodash");
const Blog = require("../models/blogSchema");
const formidable = require("formidable");
const fs = require("fs");

exports.getBlogs = async (req, res) => {
  const blogs = await Blog.find()
    .select("_id title body date")
    .sort({ date: -1 })
    .then((blogs) => {
      res.json(blogs);
    })
    .catch((err) => console.log(err));
};

exports.newBlog = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }
    let blog = new Blog(fields);

    if (files.photo) {
      blog.photo.data = fs.readFileSync(files.photo.path);
      blog.photo.contentType = files.photo.type;
    }
    blog.save((err, result) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      res.json(result);
    });
  });
};

exports.updateBlog = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }
    let blog = req.blog;
    blog = _.extend(blog, fields);
    blog.updated = Date.now();

    if (files.photo) {
      blog.photo.data = fs.readFileSync(files.photo.path);
      blog.photo.contentType = files.photo.type;
    }
    blog.save((err, result) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      res.json(result);
    });
  });
};

exports.getBlogById = (req, res, next, id) => {
  Blog.findById(id)
    .select("_id title body date")
    .exec((err, blog) => {
      if (err || !blog) {
        return res.status(400).json({
          error: err,
        });
      }
      req.blog = blog;
      next();
    });
};

exports.deleteBlog = (req, res) => {
  let blog = req.blog;
  blog.remove((err, blog) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({ message: "Blog deleted successfully" });
  });
};
