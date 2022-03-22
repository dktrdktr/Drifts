import React, { useEffect } from "react";
import { io } from "socket.io-client";
import "./App.css";

// import NotebookList from "./components/Notebooks/NotebookList";
// import NoteList from "./components/Notes/NoteList";
import Sidebar from "./components/Sidebar";
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
    <div className="container mx-auto h-full flex flex-row p-6 space-x-8">
      {/* <div className="w-2/12 h-full p-2 border-y-2 border-l-2">
          <NotebookList />
        </div>
        <div className="w-2/12 h-full p-2 border-y-2 border-l-2">
          <NoteList />
        </div> */}
      <Sidebar className="w-100 flex flex-row items-start p-2 space-x-3" />
      <div className="w-8/12 h-full p-2 outline outline-2 outline-black">
        <Editor />
      </div>
    </div>
  );
}

export default App;
