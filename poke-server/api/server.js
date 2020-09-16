const express = require("express");
const cors = require("cors");

const apiRouter = require("./api-router.js");

const server = express();

server.use(cors());

server.use("/api", apiRouter);

module.exports = server;
