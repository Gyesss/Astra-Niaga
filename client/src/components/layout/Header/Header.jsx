function Header({ children }) {
  return (
    <header className="fixed z-20 flex w-full items-center justify-around bg-linear-to-br from-orange-500/50 via-purple-500/50 to-blue-500/50 p-4 backdrop-blur-sm">
      {children}
    </header>
  );
}

export default Header;
