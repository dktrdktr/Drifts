// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 3001;
const express = require("express");
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

const indexRouter = require("./routes/index");
const usersRoutes = require("./routes/users");

app.use("/", indexRouter);
app.use("/users", usersRoutes(db));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
