import {
  PlusCircleIcon,
  NewspaperIcon,
  DocumentTextIcon,
} from "@heroicons/react/outline";
import { useState, useEffect, useRef } from "react";

const AddButton = ({ onAddNew, listType }) => {
  const [nameMode, setNameMode] = useState(false);
  const [name, setName] = useState("");
  const nameInput = useRef(null);

  useEffect(() => {
    if (nameMode === true) {
      nameInput.current.focus();
    }
  }, [nameMode]);

  const handleAddClick = () => {
    setNameMode(true);
  };

  const handleNameSubmit = () => {
    onAddNew(name);
    setNameMode(false);
    setName("");
  };

  const listItemIcon = (list) => {
    if (list === "notebooks")
      return <NewspaperIcon className={"h-4 w-4 block mr-2 shrink-0"} />;
    if (list === "notes")
      return <DocumentTextIcon className={"h-4 w-4 block mr-2 shrink-0"} />;
  };

  if (!nameMode) {
    return (
      <div
        className="flex flex-row w-full justify-items-center cursor-pointer"
        onClick={handleAddClick}
      >
        <PlusCircleIcon
          className={
            "p-2 h-10 w-full text-zinc-300 hover:bg-blue-200 hover:text-black rounded-lg"
          }
        />
      </div>
    );
  }
  return (
    <div className="hover:shadow-sm flex flex-row overflow-clip bg-gray-200 rounded-lg cursor-pointer">
      <form
        className="flex flex-row w-4/6 items-center text-sm pl-3 h-12 rounded-lg"
        onSubmit={handleNameSubmit}
      >
        {listItemIcon(listType)}
        <input
          className="rounded-md p-1 w-full bg-white outline-1 outline-black"
          type="text"
          ref={nameInput}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          onBlur={handleNameSubmit}
        />
      </form>
    </div>
  );
};

export default AddButton;
