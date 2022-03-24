import { NewspaperIcon, PencilIcon, TrashIcon } from "@heroicons/react/outline";
import { StateContext } from "../../providers/StateProvider";
import { useContext } from "react";

const NotebookListItem = ({ id, book, onClick }) => {
  const { deleteNotebook } = useContext(StateContext);

  return (
    <div className="flex flex-row w-full">
      <div
        className="flex w-3/5 items-center text-sm py-4 px-6 h-12 rounded-lg hover:bg-gray-100 cursor-pointer overflow-hidden"
        onClick={onClick}
      >
        <NewspaperIcon className={"h-6 w-6"} />
        <span className="ml-3 w-10">{book}</span>
      </div>

      <div className="flex flex-row w-2/5">
        <button>
          <PencilIcon className={"p-3 h-full hover:bg-blue-200 rounded-lg"} />
        </button>
        <button>
          <TrashIcon
            className={"p-3 h-full hover:bg-red-200 rounded-lg"}
            onClick={() => deleteNotebook(id)}
          />
        </button>
      </div>
    </div>
  );
};

export default NotebookListItem;
