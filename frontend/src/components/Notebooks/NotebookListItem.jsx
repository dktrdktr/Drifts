import { NewspaperIcon, PencilIcon, TrashIcon } from "@heroicons/react/outline";
import { StateContext } from "../../providers/StateProvider";
import { useContext, useState } from "react";

const NotebookListItem = ({ id, book, onClick }) => {
  const [isHover, setHover] = useState(false);
  const { deleteNotebook } = useContext(StateContext);

  return (
    <div
      className="hover:shadow-sm flex flex-row items-center justify-between w-full hover:bg-gray-200 rounded-lg"
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      <div
        className="w-full flex flex-row items-center text-sm pl-3 h-12 rounded-lg cursor-pointer"
        onClick={onClick}
      >
        <NewspaperIcon className={"h-4 w-4 block mr-2"} />
        <span className="whitespace-nowrap text-ellipsis">{book}</span>
      </div>

      <div
        className={`w-full flex flex-row items-center justify-end pr-3 ${
          isHover ? "block" : "hidden"
        }`}
      >
        <PencilIcon
          className={"p-1 w-6 h-6 text-black hover:bg-blue-200 rounded-lg"}
        />
        <TrashIcon
          className={"p-1 w-6 h-6 text-black hover:bg-red-200 rounded-lg"}
          onClick={() => deleteNotebook(id)}
        />
      </div>
    </div>
  );
};

export default NotebookListItem;
