const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router
    .get("/", (request, response) => {
      db.query(
        `
    SELECT notebooks.id, notebooks.book, json_agg((SELECT x FROM (SELECT notes.id, notes.title, notes.created_at, notes.updated_at) AS x)) as notes FROM notebooks
    JOIN notes ON notes.notebook_id = notebooks.id
    WHERE user_id = $1
    GROUP BY notebooks.id
    `,
        [request.query.userId]
      )
        .then((data) => {
          const notebooks = data.rows;
          response.json({ notebooks });
        })
        .catch((err) => {
          response.status(500).json({ error: err.message });
          console.log(err);
        });
    })

    // Update notebook name
    .put("/:id", (request, response) => {
      db.query(
        `
      UPDATE notebooks
      SET book = $2
      WHERE id = ($1::integer)
      `,
        [request.query.id, request.query.book]
      ).then(() => {
        response.status(204).json({});
      });
    })

    // Add new notebook
    .post("/", (request, response) => {
      db.query(
        `INSERT INTO notebooks (user_id, book) VALUES ($1::integer, $2)`,
        [request.query.id, request.query.name]
      ).then(() => {
        response.status(204).json({});
      });
    })

    // Delete notebook
    .delete("/:id", (request, response) => {
      db.query(`DELETE FROM notebooks WHERE id = $1::integer`, [
        request.query.id,
      ]).then(() => {
        response.status(204).json({});
      });
    });
  return router;
};
