// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 3001;
const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());

const usersRoutes = require("./routes/users");
const notebooksRoutes = require("./routes/notebooks");
const notesRoutes = require("./routes/notes");
const loginRoutes = require("./routes/login");

app.use("/users", usersRoutes(db));
app.use("/notebooks", notebooksRoutes(db));
app.use("/notes", notesRoutes(db));
app.use("/login", loginRoutes(db));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
