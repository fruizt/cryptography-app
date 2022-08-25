const express = require("express");
const routes = express.Router();
const classicController = require("../controller/classicController");

routes.post("/ceasarCypher", classicController.ceasarCypher)

exports.classicRoutes = routes