import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.baseURL = "http://localhost:3000/";

export default function useApplicationData() {
  const [state, setState] = useState({
    text: "",
    isLoading: true,
    currentNotebookId: null,
    currentNote: {},
  });

  useEffect(() => {
    initialLoad();
  }, []);

  const initialLoad = async () => {
    try {
      const userId = Number(Cookies.get("id"));
      setState((prev) => ({
        ...prev,
        isLoading: false,
        userId: userId,
      }));
      if (userId && userId > 0) {
        const NotebookData = await axios({
          url: "/notebooks",
          method: "get",
          params: { userId: userId },
        });

        setState((prev) => ({
          ...prev,
          notebooks: NotebookData.data.notebooks,
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const refreshData = async (userId) => {
    try {
      const NotebookData = await axios({
        url: "/notebooks",
        method: "get",
        params: { userId: userId },
      });

      setState((prev) => ({
        ...prev,
        isLoading: false,
        notebooks: NotebookData.data.notebooks,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const saveNote = async (currentNoteId, text) => {
    try {
      const res = await axios({
        url: "/notes/" + currentNoteId,
        method: "put",
        params: { id: currentNoteId, content: text },
      });
      refreshData(state.userId);
      return res.data;
    } catch (error) {
      return error.response;
    }
  };

  const addNote = async (userId) => {
    try {
      const res = await axios({
        url: "/notes",
        method: "post",
        params: { id: userId },
      });
      refreshData(state.userId);
      return res.data;
    } catch (error) {
      return error.response;
    }
  };

  const editNote = async (noteId, title) => {
    try {
      const res = await axios({
        url: "/notes/" + noteId,
        method: "put",
        params: { id: noteId, title: title },
      });
      refreshData(state.userId);
      return res.data;
    } catch (error) {
      return error.response;
    }
  };

  const deleteNote = async (currentNoteId) => {
    try {
      const res = await axios({
        url: "/notes/" + currentNoteId,
        method: "delete",
        params: { id: currentNoteId },
      });
      refreshData(state.userId);
      return res.data;
    } catch (error) {
      return error.response;
    }
  };

  const addNotebook = async (userId) => {
    try {
      const res = await axios({
        url: "/notebooks",
        method: "post",
        params: { id: userId },
      });
      refreshData(state.userId);
      return res.data;
    } catch (error) {
      return error.response;
    }
  };

  const editNotebook = async (notebookId, book) => {
    try {
      const res = await axios({
        url: "/notebooks/" + notebookId,
        method: "put",
        params: { id: notebookId, book: book },
      });
      refreshData(state.userId);
      return res.data;
    } catch (error) {
      return error.response;
    }
  };

  const deleteNotebook = async (currentNotebookId) => {
    try {
      const res = await axios({
        url: "/notebooks/" + currentNotebookId,
        method: "delete",
        params: { id: currentNotebookId },
      });
      setState((prev) => ({
        ...prev,
        currentNotebookId: null,
      }));
      refreshData(state.userId);
      return res.data;
    } catch (error) {
      return error.response;
    }
  };

  const logOut = () => {
    Cookies.remove("id", { path: "" });
    refreshData(state.userId);
  };

  return {
    logOut,
    state,
    setState,
    saveNote,
    addNote,
    editNote,
    deleteNote,
    addNotebook,
    editNotebook,
    deleteNotebook,
  };
}
