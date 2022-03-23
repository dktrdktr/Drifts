import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    notes: [],
    text: "",
    isLoading: true,
  });
  const [notebooksData, setNotebooksData] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/notebooks")
      .then((data) => {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          notebooks: data.data.notebooks,
        }));
        setNotebooksData(data.data.notebooks);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return { state, setState, notebooksData, isLoading };
}
