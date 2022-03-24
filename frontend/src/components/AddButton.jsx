import { PlusCircleIcon } from "@heroicons/react/outline";

const AddButton = ({ onClick }) => {
  return (
    <div className="flex flex-row w-full justify-items-center" onClick={onClick}>
      <PlusCircleIcon className={"p-2 h-10 w-full hover:bg-blue-200 rounded-lg"} />
    </div>
  );
};

export default AddButton;
