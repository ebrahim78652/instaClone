const bcrypt = require("bcrypt");
const userModel = require("./userModel");
const signToken = require("../auth/authMethods").signToken;

const saltRounds = 10;

const signUp = (req, res, next) => {
  //extract the data form the res body/ header
  console.log(req.body);
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
    })
    .then((savedDoc) => {
      res.status(201).json("User created!");
    })
    .catch((err) => {
      next(err);
    });
};

const signIn = async (req, res, next) => {
  console.log(req.body.email);

  //first find the user in the database
  const userDoc = await userModel.findOne({ email: req.body.email }).exec();

  //if no user found, respond
  if (!userDoc) {
    res.status(500).json("Sorry, no user with this email found");
  }

  //check if the password is valid
  await userDoc.validatePassword(req.body.password);

  //sign the token and send it to the user.
  const token = signToken({ _id: userDoc._id });
  res.status(200).send(token);
};

exports.protectedRoute = (req, res, next) => {
  console.log("confidential data");
};

exports.signUp = signUp;
exports.signIn = signIn;
