import { createContext } from "react";
import useApplicationData from "../hooks/useApplicationData";

export const StateContext = createContext();

export default function StateProvider(props) {
  const {
    notebooks,
    fetchNote,
    userId,
    selectedNotebookId,
    setSelectedNotebookId,
    selectedNote,
    setSelectedNote,
    saveNote,
    addNote,
    editNote,
    deleteNote,
    addNotebook,
    editNotebook,
    deleteNotebook,
    logOut,
  } = useApplicationData();

  const stateProviderData = {
    notebooks,
    fetchNote,
    userId,
    selectedNotebookId,
    setSelectedNotebookId,
    selectedNote,
    setSelectedNote,
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
