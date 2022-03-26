import NotebookListItem from "./NotebookListItem";
import Heading from "../Heading";
import AddButton from "../AddButton";
import { CollectionIcon } from "@heroicons/react/outline";
import { StateContext } from "../../providers/StateProvider";
import { useContext } from "react";

const NotebookList = () => {
  const { notebooks, userId, setState, addNotebook } = useContext(StateContext);

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
    <div className="shadow rounded-xl bg-white p-4 w-full overflow-y-auto">
      <Heading title={"Notebooks"} Icon={CollectionIcon} />
      {notebooks && renderNotebooks(userId)}
      {notebooks && <AddButton onClick={() => addNotebook(userId)} />}
      {/* set AddNotebook argument userId = 1 for testing */}
    </div>
  );
};

export default NotebookList;
