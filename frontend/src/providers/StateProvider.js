import axios from "axios";
import { createContext } from "react";
import useApplicationData from "../hooks/useApplicationData";

export const StateContext = createContext();

axios.defaults.baseURL = "http://localhost:3000/";

export default function StateProvider(props) {
  const { state, setState, refreshData } = useApplicationData();

  const { notebooks, notes, text, isLoading, currentNoteId } = state;

  const saveNote = async () => {
    try {
      let res = await axios({
        url: "/notes/" + currentNoteId,
        method: "put",
        params: { id: currentNoteId, content: text },
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
    currentNoteId,
    saveNote,
  };

  return (
    <StateContext.Provider value={stateProviderData}>
      {props.children}
    </StateContext.Provider>
  );
}
