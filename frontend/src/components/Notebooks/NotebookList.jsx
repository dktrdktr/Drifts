import NotebookListItem from "./NotebookListItem";
import Heading from "../Heading";
import AddButton from "../AddButton";
import { CollectionIcon } from "@heroicons/react/outline";
import { StateContext } from "../../providers/StateProvider";
import { useContext } from "react";

const NotebookList = () => {
  const { notebooks, setState, addNotebook } = useContext(StateContext);

  const renderNotebooks = (userId) => {
    const filteredNotebooks = notebooks.filter(
      (item) => item.user_id === userId
    );

    return filteredNotebooks.map((item) => {
      return (
        <NotebookListItem
          key={item.id}
          id={item.id}
          book={item.book}
          onClick={() =>
            setState((prev) => ({
              ...prev,
              currentNotebookId: item.id,
              currentNote: {},
              text: "",
            }))
          }
        />
      );
    });
  };

  return (
    <div className="shadow rounded-3xl bg-white p-4 rounded w-full">
      <Heading title={"Notebooks"} Icon={CollectionIcon} />
      {notebooks && renderNotebooks(1)}
      {notebooks && <AddButton onClick={() => addNotebook(1)} />}
      {/* set AddNotebook argument userId = 1 for testing */}
    </div>
  );
};

export default NotebookList;
