const _ = require("lodash");
const PortfolioItem = require("../models/portfolioItemSchema");
const formidable = require("formidable");
const fs = require("fs");
const portfolioItemSchema = require("../models/portfolioItemSchema");

exports.getItems = async (req, res) => {
  const items = await portfolioItemSchema
    .find()
    .select("_id title description date")
    .sort({ date: -1 })
    .then((items) => {
      res.json(items);
    })
    .catch((err) => console.log(err));
};
