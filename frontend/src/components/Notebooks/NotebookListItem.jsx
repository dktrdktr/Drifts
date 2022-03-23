import { NewspaperIcon } from "@heroicons/react/outline";

const NotebookListItem = ({ book, onClick }) => {
  return (
    <>
      <div
        onClick={onClick}
        className="flex items-center  text-sm py-4 px-6 h-12 rounded-lg hover:bg-gray-100 cursor-pointer overflow-hidden"
      >
        <NewspaperIcon className={"h-6 w-6"} />
        <span className="ml-3">{book}</span>
      </div>
    </>
  );
};

export default NotebookListItem;
