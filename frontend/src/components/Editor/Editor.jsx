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
  LogoutIcon,
} from "@heroicons/react/outline";

const SPLIT = "SPLIT";
const EDIT = "EDIT";
const VIEW = "VIEW";

const Editor = ({ viewMode, handleEditorBackClick, setUserAuth }) => {
  const { saveNote, logOut, currentNote, text } = useContext(StateContext);
  const [editorMode, setEditorMode] = useState(EDIT);

  return (
    <>
      <div className="w-full h-1/12 flex justify-between">
        {viewMode && viewMode === "EDITOR" && (
          <div className="flex flex-row space-x-4">
            <ChevronLeftIcon
              className="h-8 w-8 cursor-pointer hover:text-blue-500"
              onClick={() => handleEditorBackClick()}
            />
          </div>
        )}
        {!viewMode && <div />}
        <div className="flex flex-row gap-x-2">
          <SaveIcon
            className={"h-8 w-8 cursor-pointer hover:text-blue-500"}
            onClick={() => saveNote(currentNote.id, text)}
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
      <section className="w-full h-4/5 flex flex-column space-x-2">
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
      <div className="flex justify-between">
        <br />
        <LogoutIcon
          className="h-8 w-8 cursor-pointer hover:text-red-500"
          onClick={() => {
            setUserAuth(false);
            logOut();
          }}
        />
      </div>
    </>
  );
};

export default Editor;
