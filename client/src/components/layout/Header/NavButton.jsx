import { useState, useRef, useEffect } from "react";
import LoginForm from "../../feature/Auth/LoginForm";
import RegisterForm from "../../feature/Auth/RegisterForm";

function NavButton() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // 1. Tambahkan state untuk menentukan mode (login atau register)
  const [authMode, setAuthMode] = useState("login");

  // 2. Inisialisasi User (Solusi error cascading renders yang tadi)
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const menuRef = useRef(null);
  const authRef = useRef(null);

  // Fungsi toggle
  function toggleMenu() {
    setIsMenuOpen((prev) => !prev);
    setIsAuthOpen(false);
  }

  function toggleAuth() {
    setIsAuthOpen((prev) => !prev);
    setIsMenuOpen(false);
    setAuthMode("login"); // Reset ke login setiap kali dropdown dibuka
  }

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsAuthOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthOpen(false);
  };

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav>
      <div className="flex items-center gap-4 text-xl md:gap-8 md:text-2xl">
        {/* HAMBURGER MENU */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={toggleMenu}
            className="cursor-pointer rounded transition-all duration-200 hover:text-blue-500"
          >
            <i className="fa-solid fa-bars"></i>
          </button>

          {isMenuOpen && (
            <div className="absolute top-full right-0 z-50 mt-2 min-w-40 overflow-hidden rounded border bg-white text-center shadow-lg">
              <ul className="flex flex-col text-base text-gray-700">
                <li className="cursor-pointer px-4 py-2 transition-all hover:bg-blue-500 hover:text-white">
                  About Us
                </li>
                <li className="cursor-pointer px-4 py-2 transition-all hover:bg-blue-500 hover:text-white">
                  Product
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* AUTH BUTTON & DROPDOWN */}
        <div className="relative" ref={authRef}>
          <button
            onClick={toggleAuth}
            className="group relative flex items-center justify-center focus:outline-none"
          >
            {user ? (
              /* Tampilan Foto Profil Lingkaran */
              <div
                className={`h-8 w-8 overflow-hidden rounded-full border-2 transition-all duration-200 md:h-10 md:w-10 ${isAuthOpen ? "border-blue-500 ring-2 ring-blue-500/20" : "border-blue-950 group-hover:border-blue-500"}`}
              >
                <img
                  src={
                    user.profile_picture ||
                    `https://ui-avatars.com/api/?name=${user.username}&background=3b82f6&color=fff`
                  }
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              /* Ikon Login jika belum masuk */
              <i className="fa-solid fa-right-to-bracket text-xl transition-all duration-200 hover:text-blue-500 md:text-2xl"></i>
            )}
          </button>

          {isAuthOpen && (
            <div className="absolute top-full right-0 z-50 mt-3">
              {user ? (
                /* TAMPILAN JIKA SUDAH LOGIN */
                <div className="min-w-40 overflow-hidden rounded border bg-white text-center shadow-lg">
                  <div className="border-b bg-gray-50 px-4 py-2 text-sm font-bold text-blue-500 uppercase">
                    {user.role}
                  </div>
                  <ul className="flex flex-col text-base text-gray-700">
                    <li
                      onClick={handleLogout}
                      className="cursor-pointer px-4 py-2 transition-all hover:bg-red-500 hover:text-white"
                    >
                      Log Out
                    </li>
                  </ul>
                </div>
              ) : /* TAMPILAN JIKA BELUM LOGIN (LOGIN VS REGISTER) */
              authMode === "login" ? (
                <LoginForm
                  onLoginSuccess={handleLoginSuccess}
                  onSwitchToRegister={() => setAuthMode("register")}
                />
              ) : (
                <RegisterForm onSwitchToLogin={() => setAuthMode("login")} />
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavButton;
