import NotebookList from "./NotebookList";
import NoteList from "./NoteList";

const Sidebar = () => {
  return (
    <>
      <div className="w-2/12 h-full p-2 border-y-2 border-l-2">
        <NotebookList />
      </div>

      <div className="w-3/12 h-full p-2 border-y-2 border-l-2">
        <NoteList />
      </div>
    </>
  );
};

export default Sidebar;
