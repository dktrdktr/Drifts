const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router
    .get("/", (request, response) => {
      // This query is too complex, a simpler solution would be desirable to aggregate the notes data
      // LEFT JOIN is necessary to return notebooks which have no notes
      // COALESCE FILTER pattern is necessary to prevent null values returned inside the notes array
      // https://stackoverflow.com/questions/24155190/postgresql-left-join-json-agg-ignore-remove-null
      db.query(
        `
    SELECT notebooks.id, notebooks.title, COALESCE(json_agg((SELECT x FROM (SELECT notes.id, notes.title, notes.created_at, notes.updated_at) AS x)) FILTER (WHERE notes.id IS NOT NULL), '[]') as notes FROM notebooks
    LEFT JOIN notes ON notes.notebook_id = notebooks.id
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
      SET title = $2
      WHERE id = ($1::integer)
      `,
        [request.query.id, request.query.title]
      ).then(() => {
        response.status(204).json({});
      });
    })

    // Add new notebook
    .post("/", (request, response) => {
      db.query(
        `INSERT INTO notebooks (user_id, title) VALUES ($1::integer, $2) RETURNING id, title`,
        [request.query.id, request.query.name]
      ).then((res) => {
        const newNotebook = res.rows[0];
        response.json(newNotebook);
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
