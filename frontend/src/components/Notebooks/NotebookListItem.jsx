import { NewspaperIcon, PencilIcon, TrashIcon } from "@heroicons/react/outline";

const NotebookListItem = ({ book, onClick }) => {
  return (
    <div className="flex flex-row w-full ">
      
      <div
        onClick={onClick}
        className="flex items-center text-sm py-4 px-6 h-12 rounded-lg hover:bg-gray-100 cursor-pointer overflow-hidden"
      >
        <NewspaperIcon className={"h-6 w-6"} />
        <span className="ml-3 w-10">{book}</span>
      </div>

      <div className="flex flex-row">
        <button>
          <PencilIcon className={"p-4 h-full hover:bg-blue-200 "} />
        </button>
        <button>
          <TrashIcon className={"p-4 h-full hover:bg-red-200 "} />
        </button>
      </div>
    </div>
  );

};

export default NotebookListItem;
