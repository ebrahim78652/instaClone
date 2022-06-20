//ended up not using cors here, and instead just used "proxy: localhost:8000/api" in the package.json of the frontend
var cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const setUpMiddleware = (app) => {
  app.use(express.json());
  app.use(morgan(":method :url"));
};

module.exports = setUpMiddleware;
