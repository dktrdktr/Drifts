import NotebookListItem from "./NotebookListItem";
import Heading from "../Heading";
import { CollectionIcon } from "@heroicons/react/outline";

const NotebookList = () => {
  return (
    <>
      <Heading title={"Notebooks"} Icon={CollectionIcon} />
      <NotebookListItem book={"Notebook 1"} />
      <NotebookListItem book={"Notebook 2"} />
    </>
  );
};

export default NotebookList;
