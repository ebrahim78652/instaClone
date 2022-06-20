//in the dev mode: I have a .env file, from which I load the environment variables into the program, hence importing the below library
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const DB_CONNECTION_LINK = process.env.DB_CONNECTION_LINK || null;
const SECRET = process.env.SECRET_KEY;

module.exports = {
  PORT,
  DB_CONNECTION_LINK,
  SECRET,
};
