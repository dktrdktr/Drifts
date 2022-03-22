const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router
    .get("/", (req, res) => {
      db.query(
        `
      SELECT user_id, notebooks.id, notebooks.book, json_agg(notes) as notes FROM notebooks
      JOIN notes ON notes.notebook_id = notebooks.id
      GROUP BY notebooks.id
      ORDER BY notebooks.id
      `
      )
        .then((data) => {
          const notebooks = data.rows;
          res.json({ notebooks });
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    })

    // Update notebook name
    .put("/:notebookId", (request, response) => {
      db.query(
        `
      UPDATE notebooks
      SET title = $2
      WHERE id = ($1::integer)
      `,
        [request.params.id]
      ).then(() => {
        response.status(204).json({});
      });
    })

    // Add new notebook
    .post("/", (request, response) => {
      db.query(`INSERT INTO notebooks (user_id) VALUES ($1::integer)`, [
        request.params.id,
      ]).then(() => {
        response.status(204).json({});
      });
    })

    // Delete notebook
    .delete("/:notebookId", (request, response) => {
      db.query(`DELETE FROM notebooks WHERE id = $1::integer`, [
        request.params.id,
      ]).then(() => {
        response.status(204).json({});
      });
    });
  return router;
};
