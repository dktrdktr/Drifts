const MarkedInput = ({ editorText, setEditorText }) => {
  const onInputChange = (e) => {
    const newValue = e.currentTarget.value;
    setEditorText(newValue);
  };

  return (
    <div className="w-full h-full py-6">
      <div className="shadow rounded-xl h-full max-w-[60ch] mx-auto p-4 bg-white">
        <textarea
          name=""
          id=""
          className="h-full w-full bg-white focus:outline-none"
          onChange={onInputChange}
          value={editorText}
        ></textarea>
      </div>
    </div>
  );
};

export default MarkedInput;
