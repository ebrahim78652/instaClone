const express = require("express");
const apiRouter = express.Router();

//since an instance of a Router implements the "Middleware" interface, we can
//pass it as the second argument to the use() method.
//https://expressjs.com/de/api.html#app.use
apiRouter.use("/user", require("../models/User/userRoutes"));

module.exports = apiRouter;
