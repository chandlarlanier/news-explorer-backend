const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../utils/config");
const {UnauthorizedError} = require("../utils/errors/Unauthorized");

const authorize = (req, res, next) => {
  const {authorization} = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Incorrect login info"));
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return next(new UnauthorizedError("Incorrect login info"))
  }

  req.user = payload;
  return next();
}

module.exports = {
  authorize
}
