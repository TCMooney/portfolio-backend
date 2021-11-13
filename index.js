const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/adminRoutes");
const portfolioItemsRoutes = require("./routes/portfolioItemsRoutes");
const blogRoutes = require("./routes/blogRoutes");
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
dotenv.config();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    proxy: true,
    name: "auth_session",
    resave: false,
    unset: "destroy",
    saveUninitialized: true,
    cookie: {
      sameSite: "none",
      secure: false,
      httpOnly: false,
      maxAge: 60000 * 60 * 24,
    },
  })
);

app.use(cookieParser());

app.use("/admin", adminRoutes);
app.use("/items", portfolioItemsRoutes);
app.use("/blogs", blogRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("db connected"))
  .catch(() => console.log("db connection error"));

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`API is listening on port ${port}`);
});
