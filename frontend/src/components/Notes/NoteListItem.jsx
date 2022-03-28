import {
  DocumentTextIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { StateContext } from "../../providers/StateProvider";
import { useContext, useState, useRef, useEffect } from "react";

const NoteListItem = ({ id, title, onClick }) => {
  const { currentNote, editNote, deleteNote } = useContext(StateContext);
  const [editNameMode, setEditNameMode] = useState(false);
  const [newName, setNewName] = useState(title);
  const nameInput = useRef(null);

  useEffect(() => {
    if (editNameMode === true) {
      nameInput.current.focus();
    }
  }, [editNameMode]);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (newName) {
      editNote(id, newName);
    }
    setEditNameMode(false);
  };

  const handleInputCancel = () => {
    setNewName(title);
    setEditNameMode(false);
  };

  return (
    <div
      className={`hover:shadow-sm flex flex-row overflow-clip hover:bg-gray-200 rounded-lg cursor-pointer ${
        currentNote.id === id ? "bg-gray-200" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex flex-row w-4/6 items-center text-sm pl-3 h-12 rounded-lg">
        <DocumentTextIcon className={"h-4 w-4 block mr-2"} />
        {!editNameMode && <span className="truncate">{title}</span>}
        {editNameMode && (
          <form onSubmit={handleNameSubmit}>
            <input
              className="rounded-md p-1 w-full bg-white outline-1 outline-black"
              type="text"
              ref={nameInput}
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              onBlur={handleInputCancel}
            />
          </form>
        )}
      </div>
      {!editNameMode && (
        <div
          className={"group w-full flex flex-row items-center justify-end pr-3"}
        >
          <PencilIcon
            className={
              "hidden group-hover:block p-1 w-6 h-6 text-black hover:bg-blue-200 rounded-lg"
            }
            onClick={(e) => {
              e.stopPropagation();
              setEditNameMode(true);
            }}
          />
          <TrashIcon
            className={
              "hidden group-hover:block p-1 w-6 h-6 text-black hover:bg-red-200 rounded-lg"
            }
            onClick={(e) => {
              e.stopPropagation();
              deleteNote(id);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default NoteListItem;
