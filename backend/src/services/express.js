const express = require("express");
const morgan = require("morgan");
const config = require("./config");
const itemController = require("../controllers/item.controller");
const app = express();

app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  //   return res.send("Hello! You have connected with Ant app.");
  return res.json({ message: "Hello! You have connected with Ant app." });
});

app.post("/items", itemController.create);

exports.start = () => {
  app.listen(config.port, (err) => {
    if (err) {
      console.error(`Error: ${err}`);
      process.exit(-1);
    }

    console.log(`Server has started at ${config.port}`);
  });
};
