import NotebookListItem from "./NotebookListItem";
import Heading from "../Heading";
import { CollectionIcon } from "@heroicons/react/outline";

const NotebookList = ({ notebooksData }) => {
  const renderNotebooks = (userId) => {
    const filteredNotebooks = notebooksData.filter(
      (item) => item.user_id === userId
    );

    return filteredNotebooks.map((item) => {
      return <NotebookListItem key={item.id} book={item.book} />;
    });
  };

  const listOfNotebooks = renderNotebooks(1); // set to filter for user_id = 1 for testing

  return (
    <div>
      <Heading title={"Notebooks"} Icon={CollectionIcon} />
      {listOfNotebooks}
    </div>
  );
};

export default NotebookList;
