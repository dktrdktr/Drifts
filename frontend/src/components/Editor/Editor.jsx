import MarkedInput from "./MarkedInput";
import MarkedPreview from "./MarkedPreview";
import Tooltip from "../Tooltip";
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
  const [saveFeedback, setSaveFeedback] = useState("hidden");

  const handleSave = async () => {
    const response = await saveNote(currentNote.id, text);
    if (response) {
      setSaveFeedback("success");
      setTimeout(() => {
        setSaveFeedback("hidden");
      }, 1000);
      return;
    }
    setSaveFeedback("error");
    setTimeout(() => {
      setSaveFeedback("hidden");
    }, 1000);
  };

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
        <div className="flex flex-row gap-x-2 items-center">
          <span
            className={`${
              saveFeedback === "success"
                ? "block animate-bounce text-[rgb(34,139,34)]"
                : saveFeedback === "error"
                ? "block animate-bounce text-[#FF0000]"
                : "hidden"
            } 
            `}
          >
            {saveFeedback === "success" ? "Saved" : "Error"}
          </span>
          <div className="relative flex flex-col items-center group">
            <SaveIcon
              className={"h-8 w-8 cursor-pointer hover:text-blue-500"}
              onClick={handleSave}
            />
            <Tooltip description={"Save"} />
          </div>
          {editorMode !== SPLIT && (
            <div className="relative flex flex-col items-center group">
              <EyeIcon
                className={
                  editorMode === VIEW
                    ? "h-8 w-8 cursor-pointer text-blue-500"
                    : "h-8 w-8 cursor-pointer hover:text-blue-500"
                }
                onClick={() =>
                  editorMode === EDIT
                    ? setEditorMode(VIEW)
                    : setEditorMode(EDIT)
                }
              />
              <Tooltip description={"View"} />
            </div>
          )}
          <div className="relative flex flex-col items-center group">
            <CashIcon
              className={
                editorMode === SPLIT
                  ? "h-8 w-8 cursor-pointer text-blue-500"
                  : "h-8 w-8 cursor-pointer hover:text-blue-500"
              }
              onClick={() =>
                editorMode !== SPLIT
                  ? setEditorMode(SPLIT)
                  : setEditorMode(EDIT)
              }
            />
            <Tooltip description={"Split"} />
          </div>
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
        <div className="relative flex flex-col items-center group">
          <LogoutIcon
            className="h-8 w-8 cursor-pointer hover:text-red-500"
            onClick={() => {
              setUserAuth(false);
              logOut();
            }}
          />
          <Tooltip description={"Logout"} translate={"translate-y-14"} />
        </div>
      </div>
    </>
  );
};

export default Editor;
