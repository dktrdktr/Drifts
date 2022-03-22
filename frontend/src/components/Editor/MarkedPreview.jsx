import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MarkedPreview = ({ text }) => {
  return (
    <div className="w-full h-full py-6">
      <article className="h-full max-w-[60ch] mx-auto border-2 p-4 prose">
        <ReactMarkdown children={text} remarkPlugins={[remarkGfm]} />
      </article>
    </div>
  );
};

export default MarkedPreview;
