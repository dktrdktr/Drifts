import React, { useEffect } from "react";
import { io } from "socket.io-client";

import NotebookList from "./components/Notebooks/NotebookList";
import NoteList from "./components/Notes/NoteList";
import Editor from "./components/Editor/Editor";
import { useState } from "react";
import useWindowWidth from "./hooks/useWindowWidth";
import StateProvider from "./providers/StateProvider";

const ENDPOINT = "http://localhost:3000";

const MENU = "MENU";
const EDITOR = "EDITOR";
const MD_BREAKPOINT = 768;

function App() {
  const [viewMode, setViewMode] = useState(MENU);
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");

  const { width } = useWindowWidth();

  useEffect(() => {
    const socket = io(ENDPOINT);
    socket.on("connect", () => console.log(socket.id));
  }, []);

  const handleNoteClick = () => {
    setViewMode(EDITOR);
  };
  const handleEditorBackClick = () => {
    setViewMode(MENU);
  };

  return (
    <StateProvider>
      <div className="container mx-auto h-full flex flex-row justify-center py-6 md:px-6 space-x-8">
        {viewMode === MENU && width < MD_BREAKPOINT && (
          <>
            <div className="flex flex-row p-2 space-x-3">
              <NotebookList setNotes={setNotes} />
              <NoteList
                handleNoteClick={handleNoteClick}
                notes={notes}
                setText={setText}
              />
            </div>
          </>
        )}
        {viewMode === EDITOR && width < MD_BREAKPOINT && (
          <div className="w-full md:w-8/12 h-full p-2">
            <Editor
              viewMode={viewMode}
              handleEditorBackClick={handleEditorBackClick}
              text={text}
              setText={setText}
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
                setText={setText}
              />
            </div>
            <div className="w-full md:w-8/12 h-full p-2">
              <Editor text={text} setText={setText} />
            </div>
          </>
        )}
      </div>
    </StateProvider>
  );
}

export default App;
