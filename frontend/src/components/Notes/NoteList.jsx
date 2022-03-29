import NoteListItem from "./NoteListItem";
import Heading from "../Heading";
import AddButton from "../AddButton";
import { NewspaperIcon } from "@heroicons/react/outline";
import { StateContext } from "../../providers/StateProvider";
import { useContext } from "react";

const NoteList = ({ handleNoteClick }) => {
  const {
    notebooks,
    currentNotebookId,
    currentNote,
    text,
    addNote,
    saveNote,
    setState,
  } = useContext(StateContext);

  let renderNotes = null;

  if (currentNotebookId !== null) {
    let notebook = notebooks.find(
      (notebook) => notebook.id === currentNotebookId
    );

    if (notebook.notes[0] !== null)
      renderNotes = notebook.notes.map((item) => {
        return (
          <NoteListItem
            key={item.id}
            id={item.id}
            title={item.title}
            onClick={() => {
              saveNote(currentNote.id, text);
              setState((prev) => ({
                ...prev,
                text: item.content,
                currentNote: item,
              }));
              if (handleNoteClick) {
                handleNoteClick();
              }
            }}
          />
        );
      });
  }

  const onAddNew = (name) => {
    addNote(currentNotebookId, name);
  };

  return (
    <div className="shadow rounded-xl bg-white p-4 w-full overflow-y-auto">
      <Heading title={"Notes"} Icon={NewspaperIcon} />
      {renderNotes}
      {currentNotebookId && (
        <AddButton onAddNew={onAddNew} listType={"notes"} />
      )}
    </div>
  );
};

export default NoteList;
