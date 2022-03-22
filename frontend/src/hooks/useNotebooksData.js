import { useState, useEffect } from "react";
import axios from "axios";

export default function useNotebooksData() {
  const [notebooksData, setNotebooksData] = useState();

  useEffect(() => {
    axios
      .get("/notebooks")
      .then((data) => setNotebooksData(data.data.notebooks))
      .catch((err) => console.log(err));
  }, []);

  return { notebooksData };
}
