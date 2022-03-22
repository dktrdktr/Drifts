const Heading = ({ title, Icon }) => {
  return (
    <>
      <div className="flex flex-row justify-start gap-x-2 items-center p-1 overflow-hidden">
        <Icon className="h-6 w-6" />
        <h2>{title}</h2>
      </div>
    </>
  );
};

export default Heading;
