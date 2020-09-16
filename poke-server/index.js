// Allows me to read .env files. Must be imported as soon as possible.
require("dotenv").config();

const server = require("./api/server");

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`\n***Running on Port: ${PORT}***\n`));
