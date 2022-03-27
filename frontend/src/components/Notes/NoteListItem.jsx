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
  const [newName, setNewName] = useState("");
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
    setEditNameMode(false);
  };

  return (
    <div
      className={`hover:shadow-sm flex flex-row w-full hover:bg-gray-200 rounded-lg cursor-pointer ${
        currentNote.id === id ? "bg-gray-200" : ""
      }`}
      onClick={onClick}
    >
      <div className="w-full flex flex-row items-center text-sm pl-3 h-12 rounded-lg">
        <DocumentTextIcon className={"h-4 w-4 block mr-2"} />
        {!editNameMode && (
          <span className="whitespace-nowrap text-ellipsis">{title}</span>
        )}
        {editNameMode && (
          <form onSubmit={handleNameSubmit}>
            <input
              className="rounded-md p-1 whitespace-nowrap w-4/5 text-ellipsis hover:bg-gray-200 outline-1 outline-black"
              type="text"
              placeholder={title}
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
