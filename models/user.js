const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const user = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: "You must enter a valid email",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

user.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({email})
  .select("+password")
  .then((foundUser) => {
    if (!foundUser) {
      return Promise.reject(new UnauthorizedError("User not found"));
    }

    return bcrypt.compare(password, foundUser.password).then((match) => {
      if (!match) {
        return Promise.reject(new UnauthorizedError("User not found"));
      }

      if (match) {
        console.log("It's a match!");
      }

      return foundUser;
    })
  })
}

module.exports = mongoose.model('users', user);
