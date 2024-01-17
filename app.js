require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const { errors } = require("celebrate");
const errorHandler = require("./middlewares/errorHandler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { serverAddress, limiter } = require("./utils/config");

const app = express();

app.use(cors());

const { PORT = 3001 } = process.env;
const routes = require("./routes");

mongoose.connect(
  serverAddress,
  (r) => {
    console.log("Connected to database", r);
  },
  (e) => {
    console.log("Error connecting to database", e);
  },
);

app.use(express.json());

app.use(helmet());

app.use(limiter);

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
