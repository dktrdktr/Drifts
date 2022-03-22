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
      <div className="w-full h-full flex flex-row items-center py-12 px-6 mx-auto">
        <div className="w-1/12 h-full p-2 border-y-2 border-l-2">
          <Sidebar />
        </div>
        <div className="w-2/12 h-full p-2 border-y-2 border-l-2">
          <NoteList />
        </div>
        <div className="w-9/12 h-full p-2 border-2">
          <Editor />
        </div>
      </div>
    </>
  );
}

export default App;
