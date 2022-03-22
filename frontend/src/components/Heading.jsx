const Heading = ({ title, Icon }) => {
  return (
    <span className="flex flex-row justify-start gap-x-2 items-center p-1 overflow-hidden px-6 mb-2">
      <Icon className="h-6 w-6" />
      <h2>{title}</h2>
    </span>
  );
};

export default Heading;
