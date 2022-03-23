import { DocumentTextIcon } from "@heroicons/react/outline";

const NoteListItem = ({ title, onClick }) => {
  return (
    <div
      className="flex items-center  text-sm py-4 px-6 h-12 rounded-lg hover:bg-gray-100 cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      <DocumentTextIcon className={"h-6 w-6"} />
      <span className="ml-3">{title}</span>
    </div>
  );
};

export default NoteListItem;
