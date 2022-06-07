const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const userModel = require("./userModel");
const mongoose = require("mongoose");

const saltRounds = 10;

const signUp = (req, res, next) => {
  //extract the data form the res body/ header
  const { name, password, email } = req.body;
  if (!(name && password && email)) {
    res.status(422).json("Please enter all the fields!");
  }
  //now hash the  password
  bcrypt
    .hash(password, saltRounds)
    .then((hashedPassword) => {
      const user = new userModel({ name, email, password: hashedPassword });
      return user.save();
      //change the code here above
    })
    .then((savedDoc) => {
      res.status(201).send("User created!");
    })
    .catch((err) => {
      next(err);
    });
};

const signIn = async (req, res, next) => {
  console.log(req.body.email);
  const userDoc = await userModel.findOne({ email: req.body.email }).exec();
  console.log(userDoc);
  console.log(req.body.password);

  const userEmail = userDoc.get("email");
  const passwordHashed = userDoc.get("password");

  /*   bcrypt.compare(req.body.password, passwordHashed).then((result) => {
    if (result) {
      res.status(200).send("password was correct!");
    } else {
      res.status(401).send("email or password incorrect");
    }
  }); */

  const ispasswordMatch = await userDoc.validatePassword(req.body.password);
  if (ispasswordMatch) {
    res.status(200).send("password was correct!");
  } else {
    res.status(401).send("email or password incorrect");
  }
};

exports.signUp = signUp;
exports.signIn = signIn;
