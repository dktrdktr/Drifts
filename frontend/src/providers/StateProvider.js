import { createContext } from "react";
import useApplicationData from "../hooks/useApplicationData";

export const StateContext = createContext();

export default function StateProvider(props) {
  const { state, setState } = useApplicationData();

  const { notebooks, notes, text, isLoading, currentNoteId } = state;

  const stateProviderData = {
    setState,
    notebooks,
    notes,
    text,
    isLoading,
    currentNoteId,
  };

  return (
    <StateContext.Provider value={stateProviderData}>
      {props.children}
    </StateContext.Provider>
  );
}
