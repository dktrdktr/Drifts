import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MarkedPreview = ({ text }) => {
  return (
    <div className="w-6/12 h-full p-6 border-2 border-black">
      <article className="w-full h-full prose lg:prose-xl">
        <ReactMarkdown children={text} remarkPlugins={[remarkGfm]} />
      </article>
    </div>
  );
};

export default MarkedPreview;
