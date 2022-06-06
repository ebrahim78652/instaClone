require("dotenv").config();
const PORT = process.env.PORT || 3000;
const DB_CONNECTION_LINK = process.env.DB_CONNECTION_LINK || null;

module.exports = {
  PORT,
  DB_CONNECTION_LINK,
};
