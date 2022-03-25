import NoteListItem from "./NoteListItem";
import Heading from "../Heading";
import AddButton from "../AddButton";
import { NewspaperIcon } from "@heroicons/react/outline";
import { StateContext } from "../../providers/StateProvider";
import { useContext } from "react";

const NoteList = ({ handleNoteClick }) => {
  const { notebooks, currentNotebookId, setState, addNote } =
    useContext(StateContext);

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
              setState((prev) => ({
                ...prev,
                text: item.content,
                currentNote: item,
              }));
              handleNoteClick();
            }}
          />
        );
      });
  }

  return (
    <div className="bg-white p-4 rounded w-full">
      <Heading title={"Notes"} Icon={NewspaperIcon} />
      {renderNotes}
      {renderNotes && <AddButton onClick={() => addNote(currentNotebookId)} />}
    </div>
  );
};

export default NoteList;
