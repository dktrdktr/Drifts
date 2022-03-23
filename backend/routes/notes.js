const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router
    // Update note title
    .put("/:id", (request, response) => {
      db.query(
        `
      UPDATE notes
      SET title = $2
      WHERE id = ($1::integer)
      `,
        [request.params.id]
      ).then(() => {
        response.status(204).json({});
      });
    })

    // Add new note
    .post("/", (request, response) => {
      db.query(`INSERT INTO notes (notebook_id) VALUES ($1::integer)`, [
        request.params.id,
      ]).then(() => {
        response.status(204).json({});
      });
    })

    // Delete note
    .delete("/:id", (request, response) => {
      db.query(`DELETE FROM notes WHERE id = $1::integer`, [
        request.params.id,
      ]).then(() => {
        response.status(204).json({});
      });
    });
  return router;
};
