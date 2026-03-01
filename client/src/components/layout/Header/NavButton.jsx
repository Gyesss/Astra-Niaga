import { useState, useRef, useEffect } from "react";

function NavButton() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLogIn] = useState(false);

  const menuRef = useRef(null);
  const authRef = useRef(null);

  function toggleMenu() {
    setIsMenuOpen((prev) => !prev);
    setIsAuthOpen(false);
  }

  function toggleAuth() {
    setIsAuthOpen((prev) => !prev);
    setIsMenuOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        authRef.current &&
        !authRef.current.contains(e.target)
      ) {
        setIsMenuOpen(false);
        setIsAuthOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (isLogIn) {
    return (
      <nav>
        <div className="flex gap-4 text-xl md:gap-8 md:text-2xl">
          <div className="relative" ref={menuRef}>
            <button
              onClick={toggleMenu}
              className="cursor-pointer rounded transition-all duration-200 hover:text-blue-500"
            >
              <i className="fa-solid fa-bars"></i>
            </button>

            {isMenuOpen && (
              <div className="absolute top-full right-0 mt-2 min-w-40 rounded border bg-gray-200/80 text-center shadow-lg">
                <ul className="flex flex-col text-base">
                  <li className="cursor-pointer px-3 py-2 transition-all duration-200 hover:bg-blue-500/80 hover:text-white">
                    About Us
                  </li>
                  <li className="cursor-pointer px-3 py-2 transition-all duration-200 hover:bg-blue-500/80 hover:text-white">
                    Product
                  </li>
                  <li></li>
                </ul>
              </div>
            )}
          </div>

          <div className="relative" ref={authRef}>
            <button
              onClick={toggleAuth}
              className="cursor-pointer rounded transition-all duration-200 hover:text-blue-500"
            >
              <i className="fa-solid fa-right-to-bracket"></i>
            </button>

            {isAuthOpen && (
              <div className="absolute top-full right-0 mt-2 min-w-40 rounded border bg-gray-200/80 text-center shadow-lg">
                <ul className="flex flex-col text-base">
                  <li className="cursor-pointer px-3 py-2 transition-all duration-200 hover:bg-blue-500/80 hover:text-white">
                    Log In
                  </li>
                  <li className="cursor-pointer px-3 py-2 transition-all duration-200 hover:bg-blue-500/80 hover:text-white">
                    Register
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    );
  } else {
    return (
      <nav>
        <div className="flex gap-4 text-xl md:gap-8 md:text-2xl">
          <div className="relative" ref={menuRef}>
            <button
              onClick={toggleMenu}
              className="cursor-pointer rounded transition-all duration-200 hover:text-red-500"
            >
              <i className="fa-solid fa-bars"></i>
            </button>

            {isMenuOpen && (
              <div className="absolute top-full right-0 mt-2 min-w-40 rounded border bg-gray-200/80 text-center shadow-lg">
                <ul className="flex flex-col text-base">
                  <li className="cursor-pointer px-3 py-2 transition-all duration-200 hover:bg-red-500/80 hover:text-white">
                    About Us
                  </li>
                  <li className="cursor-pointer px-3 py-2 transition-all duration-200 hover:bg-red-500/80 hover:text-white">
                    Product
                  </li>
                  <li></li>
                </ul>
              </div>
            )}
          </div>

          <div className="relative" ref={authRef}>
            <button
              onClick={toggleAuth}
              className="cursor-pointer rounded transition-all duration-200 hover:text-red-500"
            >
              <i className="fa-solid fa-right-from-bracket"></i>
            </button>

            {isAuthOpen && (
              <div className="absolute top-full right-0 mt-2 min-w-40 rounded border bg-gray-200/80 text-center shadow-lg">
                <ul className="flex flex-col text-base">
                  <li className="cursor-pointer px-3 py-2 transition-all duration-200 hover:bg-red-500/80 hover:text-white">
                    Log Out
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default NavButton;
