import NotebookListItem from "./NotebookListItem";
import Heading from "../Heading";
import { CollectionIcon } from "@heroicons/react/outline";
import { StateContext } from "../../providers/StateProvider";
import { useContext } from "react";

const NotebookList = () => {
  const { notebooks, setState } = useContext(StateContext);

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
            }))
          }
        />
      );
    });
  };

  return (
    <div className="w-1/2">
      <Heading title={"Notebooks"} Icon={CollectionIcon} />
      {notebooks && renderNotebooks(1)}
    </div>
  );
};

export default NotebookList;
