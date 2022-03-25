const express = require("express");
const router = express.Router();

module.exports = () => {
  router.post("/", (req, res) => {
    res.status(200).json({ id: 1 });
  });

  return router;
};
