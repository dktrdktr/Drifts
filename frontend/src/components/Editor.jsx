import MarkedInput from "./MarkedInput";
import MarkedPreview from "./MarkedPreview";
import EditorViewToggle from "./EditorViewToggle";
import { useState } from "react";

const Editor = () => {
  const [text, setText] = useState("");
  const [viewMode, setViewMode] = useState("splitView");

  return (
    <>
      <section className="w-full h-full flex">
        {viewMode==="splitView" && (
          <>
          <MarkedInput setText={setText} text={text} />
      <MarkedPreview text={text} />
          </>
        )}
        {/* <EditorViewToggle viewMode={viewMode} setViewMode={setViewMode} /> */}
      </section>
    </>
  );
};

export default Editor;
