//before anything we will first run the config file.
const config = require("./config");
const express = require("express");
const setUpMiddleware = require("./middleware");
const mongoose = require("mongoose");
const app = express();
const apiRouter = require("./api/api");
const { next } = require("cli");

//now set up the app middleware.
setUpMiddleware(app);

//global route for testing is server working
app.get("/", (req, res, next) => {
  res.send("hello world server is running!");
});

//connect to the mongo db server
mongoose.connect(config.DB_CONNECTION_LINK);
mongoose.connection.on("connected", () => {
  console.log("\x1b[36m%s\x1b[0m", "Connection to database successful!");
  console.log(mongoose.connection.readyState);
});
mongoose.connection.on("error", () => {
  console.log("\x1b[36m%s\x1b[0m", "Connection to database failed!");
  console.log(mongoose.connection.readyState);
});

//now if the env is production: then build the application:
if (process.env.NODE_ENV == "production") {
  app.use(express.static("insta-clone-frontend/build"));
  const path = require("path");
  app.get(
    "*",
    (req,
    res,
    (next) => {
      res.sendFile(
        path.resolve(__dirname, "insta-clone-frontend", "build", "index.html")
      );
    })
  );
}

//set up the routes
app.use("/api", apiRouter);
app.listen(config.PORT, () => {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `listening for requests on port number: ${config.PORT}`
  );
});
