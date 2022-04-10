import {
  CashIcon,
  ChevronLeftIcon,
  EyeIcon,
  LogoutIcon,
  SaveIcon,
} from "@heroicons/react/outline";
import { useContext, useEffect, useState } from "react";
import { StateContext } from "../../providers/StateProvider";
import MarkedInput from "./MarkedInput";
import MarkedPreview from "./MarkedPreview";

const SPLIT = "SPLIT";
const EDIT = "EDIT";
const VIEW = "VIEW";

const Editor = ({ viewMode, handleEditorBackClick, setUserAuth }) => {
  const { saveNote, logOut, selectedNote } = useContext(StateContext);
  const [editorText, setEditorText] = useState("");
  const [editorMode, setEditorMode] = useState(EDIT);
  const [saveFeedback, setSaveFeedback] = useState("hidden");

  useEffect(() => {
    setEditorText(selectedNote.content);
  }, [selectedNote]);

  const handleSave = async () => {
    const res = await saveNote(selectedNote.id, editorText);
    if (res.ok) {
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

  console.log("Editor render");
  return (
    <>
      <div className="flex w-full h-1/12 justify-between gap-x-4">
        {viewMode && viewMode === "EDITOR" && (
          <div className="flex flex-row">
            <ChevronLeftIcon
              className="h-8 w-8 cursor-pointer hover:text-blue-500"
              onClick={() => handleEditorBackClick()}
            />
          </div>
        )}
        {!viewMode && (
          <div className="flex flex-row space-x-4 invisible">
            <ChevronLeftIcon
              className="h-8 w-8 cursor-pointer hover:text-blue-500"
              onClick={() => handleEditorBackClick()}
            />
          </div>
        )}
        <div className="flex justify-between gap-x-4 w-36">
          <div className="relative flex flex-col items-center group w-8">
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
            <p className="text-xs select-none">Split</p>
          </div>
          {editorMode !== SPLIT && (
            <div className="relative flex flex-col items-center group w-8">
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
              <p className="text-xs select-none">View</p>
            </div>
          )}
          <div className="relative flex flex-col items-center group w-8">
            <SaveIcon
              className={"h-8 w-8 cursor-pointer hover:text-blue-500"}
              onClick={handleSave}
            />
            <p
              className={`text-xs select-none ${
                saveFeedback === "success"
                  ? "block animate-bounce text-[rgb(34,139,34)]"
                  : saveFeedback === "error"
                  ? "block animate-bounce text-[#FF0000]"
                  : ""
              }`}
            >
              {saveFeedback === "success" ? "Saved" : "Save"}
            </p>
          </div>
        </div>
        <div>
          <div className="relative flex flex-col items-center group">
            <LogoutIcon
              className="h-8 w-8 cursor-pointer hover:text-red-500"
              onClick={() => {
                setUserAuth(false);
                logOut();
              }}
            />
            <p className="text-xs select-none">Logout</p>
          </div>
        </div>
      </div>
      <section className="w-full h-full flex flex-column pb-2 space-x-2">
        {editorMode === SPLIT && (
          <>
            <MarkedInput
              editorText={editorText}
              setEditorText={setEditorText}
            />
            <MarkedPreview editorText={editorText} />
          </>
        )}
        {editorMode === EDIT && (
          <>
            <MarkedInput
              editorText={editorText}
              setEditorText={setEditorText}
            />
          </>
        )}
        {editorMode === VIEW && (
          <>
            <MarkedPreview editorText={editorText} />
          </>
        )}
      </section>
    </>
  );
};

export default Editor;
