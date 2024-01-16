const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userModel = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const { BadRequestError } = require("../utils/errors/BadRequest");
const { ConflictError } = require("../utils/errors/Conflict");
const { NotFoundError } = require("../utils/errors/NotFound");

const getCurrentUser = (req, res, next) => {
  userModel.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError("User not found");
    })
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

const signIn = (req, res, next) => {
  const { email, password } = req.body;
  return userModel.findUserByCredentials(email, password)
    .then((user) => {
      res.status(200).send({
        token: jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" }),
      });
    })
    .catch(next);
};

const signUp = (req, res, next) => {
  const { name, email, password } = req.body;

  userModel.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        throw new ConflictError("User with this email already exists");
      }

      return bcrypt
        .hash(password, 10)
        .then((hash) => User.create({ name, email, password: hash }))
        .then((newUser) => {
          res.send({
            name,
            email,
            _id: newUser._id,
          });
        });
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        next(new BadRequestError("Validation error"));
      } else {
        next(error);
      }
    });
};

module.exports = {
  getCurrentUser,
  signIn,
  signUp,
};
