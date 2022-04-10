import { NewspaperIcon } from "@heroicons/react/outline";
import { useContext } from "react";
import { StateContext } from "../../providers/StateProvider";
import AddButton from "../AddButton";
import Heading from "../Heading";
import NoteListItem from "./NoteListItem";

const NoteList = ({ handleNoteClick }) => {
  const { notebooks, selectedNotebookId, fetchNote, addNote } =
    useContext(StateContext);

  let renderNotes = null;

  if (selectedNotebookId !== null) {
    const notebook = Object.values(notebooks).find(
      (notebook) => notebook.id === selectedNotebookId
    );
    if (notebook.notes && notebook.notes.length !== 0) {
      renderNotes = notebook.notes.map((item) => {
        return (
          <NoteListItem
            key={item.id}
            id={item.id}
            title={item.title}
            onClick={() => {
              const response = fetchNote(item.id);
              if (response.ok && handleNoteClick) {
                handleNoteClick();
              }
            }}
          />
        );
      });
    }
  }

  const onAddNew = (name) => {
    addNote(selectedNotebookId, name);
  };

  console.log("NoteList render");
  return (
    <div className="shadow rounded-xl bg-white p-4 w-full overflow-y-auto">
      <Heading title={"Notes"} Icon={NewspaperIcon} />
      {renderNotes}
      {selectedNotebookId && (
        <AddButton onAddNew={onAddNew} listType={"notes"} />
      )}
    </div>
  );
};

export default NoteList;
