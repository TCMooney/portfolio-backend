const _ = require("lodash");
const PortfolioItem = require("../models/portfolioItemSchema");
const formidable = require("formidable");
const fs = require("fs");
const portfolioItemSchema = require("../models/portfolioItemSchema");

exports.getItems = async (req, res) => {
  const items = await portfolioItemSchema
    .find()
    .select("_id title description portfolioItemUrl date")
    .sort({ date: -1 })
    .then((items) => {
      res.json(items);
    })
    .catch((err) => console.log(err));
};

exports.newItem = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }
    let item = new PortfolioItem(fields);

    if (files.photo) {
      item.photo.data = fs.readFileSync(files.photo.path);
      item.photo.contentType = files.photo.type;
    }
    item.save((err, result) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      res.json(result);
    });
  });
};

exports.updateItem = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }
    let item = req.item;
    item = _.extend(item, fields);
    item.updated = Date.now();

    if (files.photo) {
      item.photo.data = fs.readFileSync(files.photo.path);
      item.photo.contentType = files.photo.type;
    }
    item.save((err, result) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      res.json(result);
    });
  });
};

exports.itemById = (req, res, next, id) => {
  PortfolioItem.findById(id)
    .select("_id title description portfolioItemUrl date")
    .exec((err, item) => {
      if (err || !item) {
        return res.status(400).json({
          error: err,
        });
      }
      req.item = item;
      next();
    });
};
//     .then((item) => {
//       res.json(item);
//     })
//     .catch((err) => console.log(err));
//   })
// }
