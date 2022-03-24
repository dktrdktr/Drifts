import axios from "axios";
import { createContext } from "react";
import useApplicationData from "../hooks/useApplicationData";

export const StateContext = createContext();

export default function StateProvider(props) {
  const { state, setState } = useApplicationData();

  const { notebooks, notes, text, isLoading, currentNoteId } = state;

  axios.defaults.baseURL = "http://localhost:3000/";

  const saveNote = async () => {
    try {
      let res = await axios({
        url: "/notes",
        method: "post",
        params: { id: currentNoteId, content: text },
      });
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
