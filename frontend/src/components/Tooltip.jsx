const Tooltip = ({ description, translate = "-translate-y-2" }) => {
  return (
    <div className="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex">
      <span
        className={`relative z-10 ${translate} p-2 text-xs rounded-md shadow-sm leading-none text-black whitespace-no-wrap bg-white select-none`}
      >
        {description}
      </span>
    </div>
  );
};

export default Tooltip;
