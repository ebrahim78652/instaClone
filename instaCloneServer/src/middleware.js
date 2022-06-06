var cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const setUpMiddleware = (app) => {
  app.use(express.json());
  app.use(cors());
  app.use(morgan(":method :url"));
};

module.exports = setUpMiddleware;
