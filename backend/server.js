// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 3001;
const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const app = express();
const morgan = require("morgan");

const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

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
const notebooksRoutes = require("./routes/notebooks");
const notesRoutes = require("./routes/notes");

app.use("/", indexRouter);
app.use("/users", usersRoutes(db));
app.use("/notebooks", notebooksRoutes(db));
app.use("/notes", notesRoutes(db));

io.on("connection", (socket) => {
  console.log("client connected: ", socket.id);

  socket.join("MarkThatDown-App");

  socket.on("disconnect", (reason) => {
    console.log(`client disconnected: ${socket.id} - ${reason}`);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
