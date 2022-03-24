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

      if (Object.keys(state.currentNotebook).length > 0) {
        let NotesData = await axios({
          url: "/notes",
          method: "get",
          params: { id: state.currentNotebook.id },
        });

        setState((prev) => ({
          ...prev,
          isLoading: false,
          notes: NotesData.data.notes,
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  return { refreshData, state, setState };
}
