import { createContext } from "react";
import useApplicationData from "../hooks/useApplicationData";

export const StateContext = createContext();

export default function StateProvider(props) {
  const {
    state,
    setState,
    saveNote,
    addNote,
    editNote,
    deleteNote,
    addNotebook,
    editNotebook,
    deleteNotebook,
    logOut,
  } = useApplicationData();

  const { notebooks, text, isLoading, currentNotebookId, currentNote, userId } =
    state;

  const stateProviderData = {
    setState,
    notebooks,
    text,
    isLoading,
    currentNotebookId,
    currentNote,
    userId,
    saveNote,
    addNote,
    editNote,
    deleteNote,
    addNotebook,
    editNotebook,
    deleteNotebook,
    logOut,
  };

  return (
    <StateContext.Provider value={stateProviderData}>
      {props.children}
    </StateContext.Provider>
  );
}
