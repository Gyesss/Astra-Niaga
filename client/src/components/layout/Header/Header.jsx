function Header({ children }) {
  return (
    <header className="fixed z-1000 flex w-full items-center justify-around bg-linear-to-br from-orange-500/20 via-purple-500/20 to-blue-500/20 p-4 backdrop-blur-sm">
      {children}
    </header>
  );
}

export default Header;
