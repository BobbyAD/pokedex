const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");

const apiRouter = require("./api-router.js");

const server = express();

// TODO: limit cors connections
server.use(cors());

server.use(bodyParser.json());

server.use("/api", apiRouter);

module.exports = server;
