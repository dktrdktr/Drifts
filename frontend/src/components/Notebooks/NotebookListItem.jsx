import { NewspaperIcon, PencilIcon, TrashIcon } from "@heroicons/react/outline";
import { StateContext } from "../../providers/StateProvider";
import { useContext } from "react";

const NotebookListItem = ({ id, book, onClick }) => {
  const { editNotebook, deleteNotebook } = useContext(StateContext);

  return (
    <div
      className="hover:shadow-sm flex flex-row w-full hover:bg-gray-200 rounded-lg"
      onClick={onClick}
    >
      <div className="w-full flex flex-row items-center text-sm pl-3 h-12 rounded-lg cursor-pointer">
        <NewspaperIcon className={"h-4 w-4 block mr-2"} />
        <span className="whitespace-nowrap text-ellipsis">{book}</span>
      </div>

      <div
        className={"group w-full flex flex-row items-center justify-end pr-3"}
      >
        <PencilIcon
          className={
            "hidden group-hover:block p-1 w-6 h-6 text-black hover:bg-blue-200 rounded-lg"
          }
          onClick={(e) => {
            e.stopPropagation();
            const newValue = prompt("Please enter a new notebook name:", book);
            if (newValue) {
              editNotebook(id, newValue);
            }
          }}
        />
        <TrashIcon
          className={
            "hidden group-hover:block p-1 w-6 h-6 text-black hover:bg-red-200 rounded-lg"
          }
          onClick={(e) => {
            e.stopPropagation();
            deleteNotebook(id);
          }}
        />
      </div>
    </div>
  );
};

export default NotebookListItem;
