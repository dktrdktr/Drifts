import MarkedInput from "./MarkedInput";
import MarkedPreview from "./MarkedPreview";
import { useState } from "react";
import { EyeIcon } from "@heroicons/react/outline";
import { CashIcon } from "@heroicons/react/outline";

const Editor = () => {
  const [text, setText] = useState("# Lecture notes \n Syntax highlighting");
  const [viewMode, setViewMode] = useState("editMode");

  return (
    <>
      <div className="w-full h-1/12 flex justify-between">
        <div></div>
        <div className="flex flex-row gap-x-2">
          {viewMode !== "splitView" && (
            <EyeIcon
              className={
                viewMode === "viewMode"
                  ? "h-8 w-8 cursor-pointer text-blue-500"
                  : "h-8 w-8 cursor-pointer"
              }
              onClick={() =>
                viewMode === "editMode"
                  ? setViewMode("viewMode")
                  : setViewMode("editMode")
              }
            />
          )}
          <CashIcon
            className={
              viewMode === "splitView"
                ? "h-8 w-8 cursor-pointer text-blue-500"
                : "h-8 w-8 cursor-pointer"
            }
            onClick={() =>
              viewMode !== "splitView"
                ? setViewMode("splitView")
                : setViewMode("editMode")
            }
          />
        </div>
      </div>
      <section className="w-full h-full flex">
        {viewMode === "splitView" && (
          <>
            <MarkedInput setText={setText} text={text} />
            <MarkedPreview text={text} />
          </>
        )}
        {viewMode === "editMode" && (
          <>
            <MarkedInput setText={setText} text={text} />
          </>
        )}
        {viewMode === "viewMode" && (
          <>
            <MarkedPreview text={text} />
          </>
        )}
      </section>
    </>
  );
};

export default Editor;
