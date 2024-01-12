const errorHandler = (err, req, res, next) => {
  const {statusCode = 500, message = "Server error"} = err;
  res.status(statusCode).send({message});
};

module.exports = errorHandler;
