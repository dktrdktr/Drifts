import NotebookList from "./Notebooks/NotebookList";
import NoteList from "./Notes/NoteList";

const Sidebar = ({ className }) => {
  return (
    <div className={className}>
      <NotebookList />
      <NoteList />
    </div>
  );
};

export default Sidebar;
