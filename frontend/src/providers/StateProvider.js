import { createContext } from "react";
import useApplicationData from "../hooks/useApplicationData";

export const StateContext = createContext();

export default function StateProvider(props) {
  const { notebooksData, isLoading } = useApplicationData();

  const stateProviderData = { notebooksData, isLoading };

  return (
    <StateContext.Provider value={stateProviderData}>
      {props.children}
    </StateContext.Provider>
  );
}
