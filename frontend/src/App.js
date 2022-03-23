import React, { useEffect } from "react";
import { io } from "socket.io-client";
import "./App.css";

import NotebookList from "./components/Notebooks/NotebookList";
import NoteList from "./components/Notes/NoteList";
import Editor from "./components/Editor/Editor";
import { useState } from "react";
import useWindowWidth from "./hooks/useWindowWidth";
import useNotebooksData from "./hooks/useNotebooksData";

const ENDPOINT = "http://localhost:3000";

const MENU = "MENU";
const EDITOR = "EDITOR";
const MD_BREAKPOINT = 768;

function App() {
  const [viewMode, setViewMode] = useState(MENU);
  const { width } = useWindowWidth();
  const { notebooksData, isLoading } = useNotebooksData();

  useEffect(() => {
    const socket = io(ENDPOINT);
    socket.on("connect", () => console.log(socket.id));
    socket.on("connect_error", () => {
      setTimeout(() => socket.connect(), 5000);
    });
  }, []);

  const handleNoteClick = () => {
    setViewMode(EDITOR);
  };
  const handleEditorBackClick = () => {
    setViewMode(MENU);
  };

  if (isLoading) return <span>Loading...</span>;

  return (
    <div className="container mx-auto h-full flex flex-row justify-center py-6 md:px-6 space-x-8">
      {viewMode === MENU && width < MD_BREAKPOINT && (
        <>
          <div className="flex flex-row p-2 space-x-3">
            <NotebookList notebooksData={notebooksData} />
            <NoteList handleNoteClick={handleNoteClick} />
          </div>
        </>
      )}
      {viewMode === EDITOR && width < MD_BREAKPOINT && (
        <div className="w-full md:w-8/12 h-full p-2">
          <Editor
            viewMode={viewMode}
            handleEditorBackClick={handleEditorBackClick}
          />
        </div>
      )}
      {width > MD_BREAKPOINT && (
        <>
          <div className="flex flex-row mw-100 items-start p-2 space-x-3">
            <NotebookList notebooksData={notebooksData} />
            <NoteList handleNoteClick={handleNoteClick} />
          </div>
          <div className="w-full md:w-8/12 h-full p-2">
            <Editor />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
