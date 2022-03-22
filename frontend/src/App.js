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
      <div className="w-full h-full flex flex-row items-center p-12">
        <Sidebar />

        <div className="w-7/12 h-full p-2 border-2">
          <Editor />
        </div>
      </div>
    </>
  );
}

export default App;
