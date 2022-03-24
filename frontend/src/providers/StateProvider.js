import axios from "axios";
import { createContext } from "react";
import useApplicationData from "../hooks/useApplicationData";

export const StateContext = createContext();

axios.defaults.baseURL = "http://localhost:3000/";

export default function StateProvider(props) {
  const { state, setState, refreshData } = useApplicationData();

  const { notebooks, notes, text, isLoading, currentNote } = state;

  const saveNote = async () => {
    try {
      let res = await axios({
        url: "/notes/" + currentNote.id,
        method: "put",
        params: { id: currentNote.id, content: text },
      });
      refreshData();
      return res.data;
    } catch (error) {
      return error.response;
    }
  };

  const stateProviderData = {
    setState,
    notebooks,
    notes,
    text,
    isLoading,
    currentNote,
    saveNote,
  };

  return (
    <StateContext.Provider value={stateProviderData}>
      {props.children}
    </StateContext.Provider>
  );
}
