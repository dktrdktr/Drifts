import React, { useEffect } from "react";
import { io } from "socket.io-client";
import "./App.css";

import NotebookList from "./components/Notebooks/NotebookList";
import NoteList from "./components/Notes/NoteList";
import Editor from "./components/Editor/Editor";

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
      <div className="w-full h-full flex flex-row items-center py-12 px-6 mx-auto">
        <div className="w-2/12 h-full p-2 border-y-2 border-l-2">
          <NotebookList />
        </div>
        <div className="w-2/12 h-full p-2 border-y-2 border-l-2">
          <NoteList />
        </div>
        <div className="w-8/12 h-full p-2 border-2">
          <Editor />
        </div>
      </div>
    </>
  );
}

export default App;
