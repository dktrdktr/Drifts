import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [notebooksData, setNotebooksData] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/notebooks")
      .then((data) => {
        setNotebooksData(data.data.notebooks);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return { notebooksData, isLoading };
}
