const userModel = require("../model/userModel");

const express = require("express");
const session = require("express-session");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

let emailRegex =
  /^[a-z]{1}[a-z0-9._]{1,100}[@]{1}[a-z]{2,15}[.]{1}[a-z]{2,10}$/;

const CreateUserProfile = async function (req, res) {
  try {
    let data = req.body;

    let { firstName, lastName, email, password } = data;

    if (!emailRegex.test(email)) {
      return res.status(400).send("please enter email in required format");
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    const response = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hash,
    };

    const savedData = await userModel.create(response);

    return res.status(201).send("profile registered successfully");
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function (email, password, done) {
      try {
        const user = await userModel.findOne({ email });
        if (!user) {
          return done(null, false, { message: "Incorrect email" });
        }

        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await userModel.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send({ status: false, message: "Not authenticated" });
}

const userLogin = async function (req, res, next) {
  try {
    passport.authenticate("local", async function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).send(info);
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "24h",
      });

      req.session.userId = user._id;

      console.log(req.session.userId);

      res
        .status(200)
        .send({ status: true, message: "Login successfull", token, user });
    })(req, res, next);
  } catch (error) {
    return next(error);
  }
};

const logout = async function (req, res, next) {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send({ status: false, message: err.message });
    }
    return res
      .status(200)
      .send({ status: true, message: "logged out successfully" });
  });
};



  const updateUserProfile = async function(req,res){
    let userId = req.params.userID
    let userIdExist = await userModel.findById(userId)
    if(!userIdExist) return res.status(400).send({message:'user does not exist in db'})
    let data = req.body
      let {firstName,lastName,email,password} = data
      if(password){
      const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    password==hash
}

const updateUserProfile = await userModel.findOneAndUpdate({_id:userId},data,{new:true})
return res.status(200).send({message:'user profile updated',updateUserProfile:data})

} 

module.exports = { CreateUserProfile, userLogin, logout,updateUserProfile };
