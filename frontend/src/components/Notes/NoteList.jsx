import NoteListItem from "./NoteListItem";
import Heading from "../Heading";
import { NewspaperIcon } from "@heroicons/react/outline";

const NoteList = ({ handleNoteClick }) => {
  return (
    <div>
      <Heading title={"Notes"} Icon={NewspaperIcon} />
      <NoteListItem title={"Note Title 1"} handleNoteClick={handleNoteClick} />
      <NoteListItem title={"Note Title 2"} handleNoteClick={handleNoteClick} />
      <NoteListItem title={"Note Title 3"} handleNoteClick={handleNoteClick} />
    </div>
  );
};

export default NoteList;
