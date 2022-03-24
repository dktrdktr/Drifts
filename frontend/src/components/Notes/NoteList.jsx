import NoteListItem from "./NoteListItem";
import Heading from "../Heading";
import { NewspaperIcon } from "@heroicons/react/outline";
import { StateContext } from "../../providers/StateProvider";
import { useContext } from "react";

const NoteList = ({ handleNoteClick }) => {
  const { notes, setState } = useContext(StateContext);

  let renderNotes = null;

  if (notes[0] !== null) {
    renderNotes = notes.map((item) => {
      return (
        <NoteListItem
          key={item.id}
          title={item.title}
          onClick={() => {
            setState((prev) => ({
              ...prev,
              text: item.content,
              currentNoteId: item.id,
            }));
            handleNoteClick();
          }}
        />
      );
    });
  }

  return (
    <div>
      <Heading title={"Notes"} Icon={NewspaperIcon} />
      {renderNotes}
    </div>
  );
};

export default NoteList;
