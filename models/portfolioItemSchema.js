const mongoose = require("mongoose");
const { Schema } = mongoose;

const portfolioItemSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  portfolioItemUrl: {
    type: String,
    required: true,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
});

module.exports = mongoose.model("PortfolioItem", portfolioItemSchema);
