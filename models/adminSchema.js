const mongoose = require("mongoose");
const uuid = require("uuidv1");
const crypto = require("crypto");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const adminSchema = new Schema({
  email: {
    type: String,
    trim: true,
    required: true,
  },
  hashed_password: {
    type: String,
    required: true,
  },
  salt: String,
});

adminSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuid();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

adminSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) == this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(password)
        .digest("hex");
    } catch (error) {}
  },
};

module.exports = mongoose.model("Admin", adminSchema);
