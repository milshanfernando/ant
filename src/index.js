const app = require("./services/express");
const mongooseConnection = require("./services/mongoose");

// mongooseConnection.start();
// app.start();

mongooseConnection
  .start()
  .then(() => {
    app.start();
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });
