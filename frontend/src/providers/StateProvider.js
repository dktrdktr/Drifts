import { createContext } from "react";
import useApplicationData from "../hooks/useApplicationData";

export const StateContext = createContext();

export default function StateProvider(props) {
  const { state, setState, notebooksData, isLoading } = useApplicationData();

  const {notebooks, notes, text } = state

  const stateProviderData = { setState, notebooks, notes, text, notebooksData, isLoading };

  return (
    <StateContext.Provider value={stateProviderData}>
      {props.children}
    </StateContext.Provider>
  );
}
