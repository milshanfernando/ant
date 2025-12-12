const app = require("./services/express");
const mongooseConnection = require("./services/mongoose");

mongooseConnection.start();
app.start();
