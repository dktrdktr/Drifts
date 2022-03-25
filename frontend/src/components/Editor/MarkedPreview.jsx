import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { StateContext } from "../../providers/StateProvider";
import { useContext } from "react";

const MarkedPreview = () => {
  const { text } = useContext(StateContext);

  return (
    <div className="w-full h-full py-6">
      <article className="rounded-3xl h-full max-w-[60ch] mx-auto border-2 p-4 prose">
        <ReactMarkdown children={text} remarkPlugins={[remarkGfm]} />
      </article>
    </div>
  );
};

export default MarkedPreview;
