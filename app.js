const express = require("express");
const ExpressError = require("./expressError");
const itemRoutes = require("./itemRoutes");
const app = express();

app.use(express.json());

app.use("/items", itemRoutes);

app.use(function (req, res) {
  return new ExpressError("Not Found", 404);
});

app.use(function (err, req, res, next) {
  let status = err.status || 500;

  return res.status(status).json({
    error: {
      message: err.message,
      status: status,
    },
  });
});

module.exports = app;
