const MarkedInput = ({ setText, text }) => {
  const onInputChange = (e) => {
    const newValue = e.currentTarget.value;
    setText(newValue);
  };

  return (
    <div className="w-6/12 h-full p-6 border-2 border-black">
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        className="border-2 p-2"
        onChange={onInputChange}
        value={text}
      ></textarea>
    </div>
  );
};

export default MarkedInput;
