const express = require("express");
const morgan = require("morgan");
const config = require("./config");
const apiRoutes = require("../routes/api");
const errorHandler = require("../middlewares/errorHandler.middleware");
const app = express();

app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.use(errorHandler.handleError);

exports.start = () => {
  app.listen(config.port, (err) => {
    if (err) {
      console.error(`Error: ${err}`);
      process.exit(-1);
    }

    console.log(`Server has started at ${config.port}`);
  });
};
