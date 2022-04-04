import NotebookListItem from "./NotebookListItem";
import Heading from "../Heading";
import AddButton from "../AddButton";
import { CollectionIcon } from "@heroicons/react/outline";
import { StateContext } from "../../providers/StateProvider";
import { useContext } from "react";

const NotebookList = () => {
  const { notebooks, userId, setSelectedNotebookId, addNotebook } =
    useContext(StateContext);

  console.log("NotebookList render");
  const renderNotebooks = () => {
    return notebooks.map((item) => {
      return (
        <NotebookListItem
          key={item.id}
          id={item.id}
          book={item.book}
          onClick={() => setSelectedNotebookId(item.id)}
        />
      );
    });
  };

  const onAddNew = (name) => {
    addNotebook(userId, name);
  };

  return (
    <div className="shadow rounded-xl bg-white p-4 w-full overflow-y-auto">
      <Heading title={"Notebooks"} Icon={CollectionIcon} />
      {notebooks && renderNotebooks()}
      {notebooks && <AddButton onAddNew={onAddNew} listType={"notebooks"} />}
    </div>
  );
};

export default NotebookList;
