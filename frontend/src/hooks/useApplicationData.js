import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function useApplicationData() {
  const [notebooks, setNotebooks] = useState([]);
  const [selectedNotebookId, setSelectedNotebookId] = useState(null);
  const [selectedNote, setSelectedNote] = useState({ id: null });
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const userIdFromCookie = Number(Cookies.get("id"));
    if (userIdFromCookie) {
      setUserId(userIdFromCookie);
    }

    const fetchNotebookData = async () => {
      try {
        if (userId) {
          const response = await axios({
            url: "/notebooks",
            method: "get",
            params: { userId: userId },
          });
          if (response.status >= 200 && response.status < 300) {
            const notebooksArr = response.data.notebooks;
            // Convert notebooks array into an object, for easier state updating when performing CRUD operations
            const notebooksObj = notebooksArr.reduce((accum, item) => {
              accum[item.id] = item;
              return accum;
            }, {});
            setNotebooks(notebooksObj);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchNotebookData();
  }, [userId]);

  const fetchNote = async (noteId) => {
    try {
      const response = await axios({
        url: "/notes",
        method: "get",
        params: { id: noteId },
      });
      if (response && response.data.notes[0].length !== 0) {
        setSelectedNote(response.data.notes[0]);
        return { ok: true };
      }
      return { ok: false };
    } catch (err) {
      console.log(err);
      return { ok: false };
    }
  };

  const saveNote = async (noteId, editorText) => {
    try {
      const response = await axios({
        url: "/notes/" + noteId,
        method: "put",
        params: { id: noteId, content: editorText },
      });
      if (response.status >= 200 && response.status < 300) {
        setSelectedNote((prev) => {
          return { ...prev, content: editorText };
        });
        return { ok: true };
      }
      return { ok: false };
    } catch (error) {
      console.log(error);
      return { ok: false };
    }
  };

  const addNote = async (userId, name) => {
    try {
      const res = await axios({
        url: "/notes",
        method: "post",
        params: { id: userId, title: name },
      });
      if (res.status >= 200 && res.status < 300) {
        const newNote = res.data;
        const notebookCopy = { ...notebooks[selectedNotebookId] };
        notebookCopy.notes.push(newNote);
        setNotebooks({ ...notebooks, [selectedNotebookId]: notebookCopy });
        return { ok: true };
      }
      return { ok: false };
    } catch (err) {
      console.log(err);
      return { ok: false };
    }
  };

  const editNote = async (noteId, title) => {
    try {
      const res = await axios({
        url: "/notes/" + noteId,
        method: "put",
        params: { id: noteId, title: title },
      });
      if (res.status >= 200 && res.status < 300) {
        const notebookCopy = { ...notebooks[selectedNotebookId] };
        const noteIndex = notebookCopy.notes.findIndex(
          (note) => note.id === noteId
        );
        notebookCopy.notes[noteIndex].title = title;
        setNotebooks({ ...notebooks, [selectedNotebookId]: notebookCopy });
        return { ok: true };
      }
      return { ok: false };
    } catch (err) {
      console.log(err);
      return { ok: false };
    }
  };

  const deleteNote = async (noteId) => {
    try {
      const res = await axios({
        url: "/notes/" + noteId,
        method: "delete",
        params: { id: noteId },
      });
      if (res.status >= 200 && res.status < 300) {
        const notebookCopy = { ...notebooks[selectedNotebookId] };
        const updatedNotes = notebookCopy.notes.filter(
          (note) => note.id !== noteId
        );
        const updatedNotebook = { ...notebookCopy, notes: updatedNotes };
        setNotebooks({ ...notebooks, [selectedNotebookId]: updatedNotebook });
        return { ok: true };
      }
      return { ok: false };
    } catch (err) {
      console.log(err);
      return { ok: false };
    }
  };

  const addNotebook = async (userId, name) => {
    console.log("addNotebook");
    // try {
    //   const res = await axios({
    //     url: "/notebooks",
    //     method: "post",
    //     params: { id: userId, name },
    //   });
    //   // refreshData(state.userId);
    //   return res.data;
    // } catch (error) {
    //   return error.response;
    // }
  };

  const editNotebook = async (notebookId, book) => {
    console.log("editNotebook");
    // try {
    //   const res = await axios({
    //     url: "/notebooks/" + notebookId,
    //     method: "put",
    //     params: { id: notebookId, book: book },
    //   });
    //   // refreshData(state.userId);
    //   return res.data;
    // } catch (error) {
    //   return error.response;
    // }
  };

  const deleteNotebook = async (currentNotebookId) => {
    console.log("deleteNotebook");
    // try {
    //   const res = await axios({
    //     url: "/notebooks/" + currentNotebookId,
    //     method: "delete",
    //     params: { id: currentNotebookId },
    //   });
    //   setState((prev) => ({
    //     ...prev,
    //     currentNotebookId: null,
    //   }));
    //   // refreshData(state.userId);
    //   return res.data;
    // } catch (error) {
    //   return error.response;
    // }
  };

  const logOut = () => {
    Cookies.remove("id", { path: "" });
    // refreshData(state.userId);
  };

  return {
    notebooks,
    fetchNote,
    logOut,
    userId,
    selectedNotebookId,
    setSelectedNotebookId,
    selectedNote,
    setSelectedNote,
    saveNote,
    addNote,
    editNote,
    deleteNote,
    addNotebook,
    editNotebook,
    deleteNotebook,
  };
}
