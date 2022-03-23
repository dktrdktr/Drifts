import { createContext } from "react";
import useNotebooksData from "../hooks/useNotebooksData";

export const NotebooksContext = createContext();

export default function NotebooksProvider(props) {
  const { notebooksData, isLoading } = useNotebooksData();

  const notebooksProviderData = { notebooksData, isLoading };

  return (
    <NotebooksContext.Provider value={notebooksProviderData}>
      {props.children}
    </NotebooksContext.Provider>
  );
}
