const express = require("express");
const router = express.Router();

module.exports = () => {
  router.post("/", (req, res) => {
    res.status(200).end();
  });

  return router;
};
