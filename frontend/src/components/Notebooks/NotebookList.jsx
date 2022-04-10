import { CollectionIcon } from "@heroicons/react/outline";
import { useContext } from "react";
import { StateContext } from "../../providers/StateProvider";
import AddButton from "../AddButton";
import Heading from "../Heading";
import NotebookListItem from "./NotebookListItem";

const NotebookList = () => {
  const { notebooks, userId, setSelectedNotebookId, addNotebook } =
    useContext(StateContext);

  console.log("NotebookList render");
  const renderNotebooks = () => {
    return Object.values(notebooks).map((item) => {
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
