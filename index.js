const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(express.json());
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
      secure: true,
      httpOnly: false,
      maxAge: 60000 * 60 * 24,
    },
  })
);

app.use(cookieParser());

app.use("/admin", adminRoutes);

// app.get("/", (req, res) => {
//   res.json({ msg: "Hello world" });
// });

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("db connected"))
  .catch(() => console.log("db connection error"));

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`API is listening on port ${port}`);
});
