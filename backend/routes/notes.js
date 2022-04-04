const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router
    .get("/", (request, response) => {
      db.query(
        `
    SELECT * FROM notes
    WHERE notes.id = $1
    ORDER BY notes.id
    `,
        [request.query.id]
      )
        .then((data) => {
          const notes = data.rows;
          response.json({ notes });
        })
        .catch((err) => {
          response.status(500).json({ error: err.message });
        });
    })

    // Update note title / content
    .put("/:id", (request, response) => {
      let setQuery = "SET content = ($2::text)";
      let queryArr = [request.query.id, request.query.content];

      if (request.query.title) {
        setQuery = "SET title = ($2::text)";
        queryArr = [request.query.id, request.query.title];
      }

      db.query(
        `
            UPDATE notes
            ${setQuery}
            WHERE id = ($1::integer)
            `,
        queryArr
      ).then(() => {
        response.status(204).json({});
      });
    })

    // Add new note
    .post("/", (request, response) => {
      db.query(
        `INSERT INTO notes (notebook_id, title) VALUES ($1::integer, $2)`,
        [request.query.id, request.query.title]
      ).then(() => {
        response.status(204).json({});
      });
    })

    // Delete note
    .delete("/:id", (request, response) => {
      db.query(`DELETE FROM notes WHERE id = $1::integer`, [
        request.query.id,
      ]).then(() => {
        response.status(204).json({});
      });
    });
  return router;
};
