function Anchor({ children }) {
  return (
    <span className="cursor-pointer transition-all duration-500 hover:text-blue-500">
      {children}
    </span>
  );
}

export default Anchor;
