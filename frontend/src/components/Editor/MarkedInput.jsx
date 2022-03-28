import { StateContext } from "../../providers/StateProvider";
import { useContext } from "react";

const MarkedInput = () => {
  const { text, setState } = useContext(StateContext);

  const onInputChange = (e) => {
    const newValue = e.currentTarget.value;
    setState((prev) => ({
      ...prev,
      text: newValue,
    }));
  };

  return (
    <div className="w-full h-full py-6">
      <div className="shadow rounded-xl h-full max-w-[60ch] mx-auto p-4 bg-white">
        <textarea
          name=""
          id=""
          className="h-full w-full bg-white focus:outline-none"
          onChange={onInputChange}
          value={text}
        ></textarea>
      </div>
    </div>
  );
};

export default MarkedInput;
