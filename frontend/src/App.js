import React, { useEffect } from "react";
import Cookies from "js-cookie";

import NotebookList from "./components/Notebooks/NotebookList";
import NoteList from "./components/Notes/NoteList";
import Editor from "./components/Editor/Editor";
import LoginForm from "./components/LoginForm";
import { useState } from "react";
import useWindowWidth from "./hooks/useWindowWidth";
import StateProvider from "./providers/StateProvider";

const MENU = "MENU";
const EDITOR = "EDITOR";
const XL_BREAKPOINT = 1280;

function App() {
  const [viewMode, setViewMode] = useState(MENU);
  const [userAuth, setUserAuth] = useState(false);

  const { width } = useWindowWidth();

  useEffect(() => {
    const user = Cookies.get("id") ? true : false;
    setUserAuth(user);
  }, []);

  const handleNoteClick = () => {
    setViewMode(EDITOR);
  };
  const handleEditorBackClick = () => {
    setViewMode(MENU);
  };
  if (!userAuth) {
    return (
      <div className="flex flex-row justify-center h-full py-6 md:w-full md:px-6 bg-gradient-to-r from-zinc-100 to-zinc-300">
        <LoginForm setUserAuth={setUserAuth} />
      </div>
    );
  }
  return (
    <StateProvider>
      <div className="flex flex-row justify-center h-full w-full py-6 bg-gradient-to-r from-zinc-100 to-zinc-300">
        {viewMode === MENU && width < XL_BREAKPOINT && (
          <div className="flex flex-row w-full md:max-w-3xl p-2 space-x-2">
            <NotebookList />
            <NoteList handleNoteClick={handleNoteClick} />
          </div>
        )}
        {viewMode === EDITOR && width < XL_BREAKPOINT && (
          <div className="w-full h-full p-4 pb-6">
            <Editor
              viewMode={viewMode}
              handleEditorBackClick={handleEditorBackClick}
              setUserAuth={setUserAuth}
            />
          </div>
        )}
        {width > XL_BREAKPOINT && (
          <>
            <div className="flex flex-row w-2/5 p-2 space-x-4">
              <NotebookList />
              <NoteList />
            </div>
            <div className="flex flex-wrap w-3/5 h-full py-6 px-2">
              <Editor setUserAuth={setUserAuth} />
            </div>
          </>
        )}
      </div>
    </StateProvider>
  );
}

export default App;
