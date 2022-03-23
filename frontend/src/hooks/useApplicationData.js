import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    notes: [],
    text: "",
    isLoading: true,
  });

  useEffect(() => {
    axios
      .get("/notebooks")
      .then((data) => {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          notebooks: data.data.notebooks,
        }));
      })
      .catch((err) => console.log(err));
  }, []);

  return { state, setState };
}
