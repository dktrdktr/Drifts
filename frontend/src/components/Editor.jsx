import MarkedInput from "./MarkedInput";
import MarkedPreview from "./MarkedPreview";
import EditorViewToggle from "./EditorViewToggle";
import { useState } from "react";

const Editor = () => {
  const [text, setText] = useState("");
  const [viewMode, setViewMode] = useState(false);

  return (
    <>
      <section className="w-full h-full flex">
        {viewMode && <MarkedPreview text={text} />}
        {!viewMode && <MarkedInput setText={setText} text={text} />}
        <EditorViewToggle viewMode={viewMode} setViewMode={setViewMode} />
      </section>
    </>
  );
};

export default Editor;
