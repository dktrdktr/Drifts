import NoteListItem from "./NoteListItem";
import Heading from "../Heading";
import { NewspaperIcon } from "@heroicons/react/outline";

const NoteList = ({ handleNoteClick, notes, setText }) => {
  let renderNotes = null;

  if (notes[0] !== null) {
    renderNotes = notes.map((item) => {
      return (
        <NoteListItem
          key={item.id}
          title={item.title}
          onClick={() => {
            setText(item.content);
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
