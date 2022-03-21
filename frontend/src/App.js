import React, { useEffect } from "react";
import { io } from "socket.io-client";
import "./App.css";

import Sidebar from "./components/Sidebar";
import NoteList from "./components/NoteList";
import Editor from "./components/Editor";

const ENDPOINT = "http://localhost:3000";

function App() {
  useEffect(() => {
    const socket = io(ENDPOINT);
    socket.on("connect", () => console.log(socket.id));
    socket.on("connect_error", () => {
      setTimeout(() => socket.connect(), 5000);
    });
  }, []);

  return (
    <>
      <Sidebar />
      <NoteList />
      <Editor />;
    </>
  );
}

export default App;
