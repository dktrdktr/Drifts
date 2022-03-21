import "./App.css";
import Sidebar from "./components/Sidebar";
import NoteList from "./components/NoteList";
import Editor from "./components/Editor";

function App() {
  return (
    <>
      <Sidebar />
      <NoteList />
      <Editor />;
    </>
  );
}

export default App;
