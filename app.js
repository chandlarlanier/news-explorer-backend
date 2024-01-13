require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
const errorHandler = require("./middlewares/errorHandler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();

app.use(cors());

const { PORT = 3001 } = process.env;
const routes = require("./routes");

mongoose.connect(
  "mongodb://127.0.0.1:27017/news_explorer_db",
  (r) => {
    console.log("Connected to database", r);
  },
  (e) => {
    console.log("Error connecting to database", e);
  },
);

app.use(express.json());

app.use(requestLogger);
app.use(routes);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
