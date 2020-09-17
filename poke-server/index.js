// Allows me to read .env files. Must be imported as soon as possible.
require("dotenv").config();
const connectDB = require("./db/db");

connectDB();

const server = require("./api/server");

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`\n***Running on Port: ${PORT}***\n`));
