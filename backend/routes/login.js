const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/", (request, response) => {
    db.query(
      `
      SELECT * FROM users
      WHERE email = $1
      `,
      [request.query.email.toLowerCase()]
    ).then((data) => {
      if (data.rows.length > 0) {
        const user = data.rows[0];
        response.status(200).json({ id: user.id });
      } else {
        response.status(401).json({});
      }
    });
  });

  return router;
};
