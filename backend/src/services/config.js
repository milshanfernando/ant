require("dotenv").config();
module.exports = {
  port: process.env.PORT || 4041,
  mongoUrl: process.env.MONGO_URL,
};
