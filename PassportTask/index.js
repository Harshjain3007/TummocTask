const mongoose = require("mongoose");
const express = require("express");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const route = require("./routes/routes");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    // cookie: { secure: false  , maxAge:60000}
  })
);

app.use(express.json());

app.use("/", route);

mongoose
  .connect(
    "mongodb+srv://HarshJain:harsh321@cluster0.dwkz9.mongodb.net/Passport-db"
  )
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log("server running on express");
});
