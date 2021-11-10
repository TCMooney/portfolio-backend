const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const Admin = require("../models/adminSchema");
const _ = require("lodash");

exports.signin = (req, res) => {
  const { email, password } = req.body;
  Admin.findOne({ email }, (err, admin) => {
    if (err || !admin) {
      return res.status(401).json({
        error: "User with that email does not exist.",
      });
    }
    //if user is not found make sure the email and password match
    // create authenitcation method in model and use here
    if (!uadmin.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password does not match",
      });
    }
    //generate a token with user id and secret
    jwt.sign({ _id: admin._id }, process.env.JWT_SECRET, (err, token) => {
      if (err) throw err;
      sessionData = req.session;
      sessionData.access_token = token;
      res.json({
        admin: {
          id: admin._id,
          email: admin.email,
        },
        adminId: admin._id,
        sessionData,
      });
    });
  });
};

exports.signout = (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      res.status(400).json({ error: "Error destroying session" });
    } else {
      res.status(200).json({ msg: "Session destroyed successfully" });
    }
  });
};

exports.adminSignup = (req, res) => {
  console.log(req.session);
  // const { email, password}
};

exports.requireSignin = (req, res, next) => {
  const token = req.session.access_token;
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    res.status(400).json({ error: "Token not valid" });
  }
};
