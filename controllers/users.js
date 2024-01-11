import User from "../models/user";

const getCurrentUser = (req, res) => {
  User.findById(req.user._id).orFail(() => {
    throw new NotFoundError('User not found')
  }).then((user) => {
    res.send(user)
  })
}

module.exports = {
  getCurrentUser
}
