const express = require("express");
const routes = express.Router();

const clasicRoutes = require("./classicRoutes").classicRoutes

routes.get("/test", (req,res) => {
  console.log("api is working");
  return res.send('Hello, API is working')
});

routes.use("/", clasicRoutes);


module.exports = routes;
