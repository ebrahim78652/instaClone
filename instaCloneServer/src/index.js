//before anything we will first run the config file.
const config = require("./config");
const express = require("express");
const setUpMiddleware = require("./middleware");
const mongoose = require("mongoose");
const app = express();

//now set up the app middleware.
setUpMiddleware(app);

//global route for testing is server working
app.get("/", (req, res, next) => {
  res.send("hello world server is running!");
});

//connect to the mongo db server
mongoose.connect(config.DB_CONNECTION_LINK);
mongoose.connection.on("connected", () => {
  console.log("\x1b[36m%s\x1b[0m", "Connection to database successful");
  console.log(mongoose.connection.readyState);
});

app.listen(config.PORT, () => {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `listening for requests on port number: ${config.PORT}`
  );
});
