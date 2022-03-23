import React, { useEffect } from "react";
import { io } from "socket.io-client";

import NotebookList from "./components/Notebooks/NotebookList";
import NoteList from "./components/Notes/NoteList";
import Editor from "./components/Editor/Editor";
import { useState } from "react";
import useWindowWidth from "./hooks/useWindowWidth";
import NotebooksProvider from "./providers/NotebooksProvider";

const ENDPOINT = "http://localhost:3000";

const MENU = "MENU";
const EDITOR = "EDITOR";
const MD_BREAKPOINT = 768;

function App() {
  const [viewMode, setViewMode] = useState(MENU);
  const [notes, setNotes] = useState([]);
  const [mdContent, setMdContent] = useState("");

  const { width } = useWindowWidth();

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

  return (
    <NotebooksProvider>
      <div className="container mx-auto h-full flex flex-row justify-center py-6 md:px-6 space-x-8">
        {viewMode === MENU && width < MD_BREAKPOINT && (
          <>
            <div className="flex flex-row p-2 space-x-3">
              <NotebookList setNotes={setNotes} />
              <NoteList
                handleNoteClick={handleNoteClick}
                notes={notes}
                setMdContent={setMdContent}
              />
            </div>
          </>
        )}
        {viewMode === EDITOR && width < MD_BREAKPOINT && (
          <div className="w-full md:w-8/12 h-full p-2">
            <Editor
              viewMode={viewMode}
              handleEditorBackClick={handleEditorBackClick}
              mdContent={mdContent}
            />
          </div>
        )}
        {width > MD_BREAKPOINT && (
          <>
            <div className="flex flex-row mw-100 items-start p-2 space-x-3">
              <NotebookList setNotes={setNotes} />
              <NoteList
                handleNoteClick={handleNoteClick}
                notes={notes}
                setMdContent={setMdContent}
              />
            </div>
            <div className="w-full md:w-8/12 h-full p-2">
              <Editor mdContent={mdContent} />
            </div>
          </>
        )}
      </div>
    </NotebooksProvider>
  );
}

export default App;
