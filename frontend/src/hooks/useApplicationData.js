import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    notes: [],
    text: "",
    isLoading: true,
    currentNotebook: {},
    currentNote: {},
  });

  const refreshData = async () => {
    try {
      let NotebookData = await axios.get("/notebooks");

      setState((prev) => ({
        ...prev,
        isLoading: false,
        notebooks: NotebookData.data.notebooks,
      }));
      // if (state.currentNotebook === {}) {
      //   console.log(state.currentNotebook);
      //   let NotesData = await axios.get("/notes");

      //   setState((prev) => ({
      //     ...prev,
      //     isLoading: false,
      //     notebooks: NotesData.data.notes,
      //   }));
      // }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  return { refreshData, state, setState };
}
