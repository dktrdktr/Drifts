const MarkedInput = ({ setText, text }) => {
  const onInputChange = (e) => {
    const newValue = e.currentTarget.value;
    setText(newValue);
  };

  return (
    <div className="w-full h-full py-6">
      <div className="h-full max-w-[60ch] mx-auto border-2 p-4 bg-[#f8f8f8]">
      <textarea
        name=""
        id=""
        className="h-full w-full bg-[#f8f8f8]"
        onChange={onInputChange}
        value={text}
      ></textarea>
      </div>
    </div>
  );
};

export default MarkedInput;
