import MarkedInput from "./MarkedInput";
import MarkedPreview from "./MarkedPreview";
import { useState } from "react";
import { StateContext } from "../../providers/StateProvider";
import { useContext } from "react";
import {
  EyeIcon,
  CashIcon,
  ChevronLeftIcon,
  SaveIcon,
} from "@heroicons/react/outline";

const SPLIT = "SPLIT";
const EDIT = "EDIT";
const VIEW = "VIEW";

const Editor = ({ viewMode, handleEditorBackClick }) => {
  const { saveNote } = useContext(StateContext);
  const [editorMode, setEditorMode] = useState(EDIT);

  return (
    <>
      <div className="w-full h-1/12 flex justify-between">
        {viewMode && viewMode === "EDITOR" && (
          <ChevronLeftIcon
            className="h-6 w-6 cursor-pointer hover:text-blue-500"
            onClick={() => handleEditorBackClick()}
          />
        )}
        {!viewMode && <div />}
        <div className="flex flex-row gap-x-2">
          <SaveIcon
            className={"h-8 w-8 cursor-pointer hover:text-blue-500"}
            onClick={saveNote()}
          />
          {editorMode !== SPLIT && (
            <EyeIcon
              className={
                editorMode === VIEW
                  ? "h-8 w-8 cursor-pointer text-blue-500"
                  : "h-8 w-8 cursor-pointer hover:text-blue-500"
              }
              onClick={() =>
                editorMode === EDIT ? setEditorMode(VIEW) : setEditorMode(EDIT)
              }
            />
          )}
          <CashIcon
            className={
              editorMode === SPLIT
                ? "h-8 w-8 cursor-pointer text-blue-500"
                : "h-8 w-8 cursor-pointer hover:text-blue-500"
            }
            onClick={() =>
              editorMode !== SPLIT ? setEditorMode(SPLIT) : setEditorMode(EDIT)
            }
          />
        </div>
      </div>
      <section className="w-full h-4/5 flex flex-column">
        {editorMode === SPLIT && (
          <>
            <MarkedInput />
            <MarkedPreview />
          </>
        )}
        {editorMode === EDIT && (
          <>
            <MarkedInput />
          </>
        )}
        {editorMode === VIEW && (
          <>
            <MarkedPreview />
          </>
        )}
      </section>
    </>
  );
};

export default Editor;
