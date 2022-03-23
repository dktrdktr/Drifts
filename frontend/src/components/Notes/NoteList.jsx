import NoteListItem from "./NoteListItem";
import Heading from "../Heading";
import { NewspaperIcon } from "@heroicons/react/outline";

const NoteList = ({ handleNoteClick, notes, setMdContent }) => {
  const renderNotes = () => {
    return notes.map((item) => {
      return (
        <NoteListItem
          key={item.id}
          title={item.title}
          onClick={() => {
            setMdContent(item.content);
            handleNoteClick();
          }}
        />
      );
    });
  };

  return (
    <div>
      <Heading title={"Notes"} Icon={NewspaperIcon} />
      {renderNotes()}
    </div>
  );
};

export default NoteList;
