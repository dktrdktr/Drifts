const Heading = ({ title, Icon }) => {
  return (
    <span className="flex flex-row justify-start gap-x-2 items-center p-1 overflow-hidden px-3 mb-2">
      {Icon && <Icon className="h-6 w-6 shrink-0" />}
      <h2 className="truncate">{title}</h2>
    </span>
  );
};

export default Heading;
