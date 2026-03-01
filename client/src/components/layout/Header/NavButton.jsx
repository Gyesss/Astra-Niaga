import { useState, useRef, useEffect } from "react";

function NavButton({ children, active }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState(null);

  const menuRef = useRef(null);
  const authRef = useRef(null);

  // Cek status login saat pertama kali load
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setIsMenuOpen(false);
      if (authRef.current && !authRef.current.contains(e.target)) setIsAuthOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fungsi Login Simpel (Praktis)
  const handleLogin = (role) => {
    const userData = { name: "User Astra", role: role }; // role: 'pembeli' atau 'penjual'
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setIsAuthOpen(false);
    window.location.reload(); // Refresh untuk update UI global
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthOpen(false);
    window.location.reload();
  };

  // STYLE 1: Tombol Navigasi Biasa
  if (children) {
    return (
      <button className={`px-6 py-2 transition-all duration-300 font-bold rounded-full ${active ? 'bg-blue-500 text-white shadow-lg shadow-blue-200' : 'text-gray-600 hover:text-blue-500 hover:bg-blue-50'
        }`}>
        {children}
      </button>
    );
  }

  // STYLE 2: Icon Menu & Auth
  return (
    <nav className="flex gap-3 items-center">
      {/* Menu Hamburger */}
      <div className="relative" ref={menuRef}>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-3 rounded-2xl bg-gray-100 text-gray-600 hover:bg-blue-500 hover:text-white transition-all">
          <i className="fa-solid fa-bars"></i>
        </button>
        {isMenuOpen && (
          <div className="absolute top-full right-0 mt-3 min-w-48 rounded-4xl border border-blue-50 bg-white shadow-2xl shadow-blue-900/10 overflow-hidden z-50 p-2">
            <div className="px-4 py-3 hover:bg-blue-50 text-gray-700 rounded-2xl cursor-pointer font-medium transition-colors">Tentang Kami</div>
            <div className="px-4 py-3 hover:bg-blue-50 text-gray-700 rounded-2xl cursor-pointer font-medium transition-colors">Produk Astra</div>
            {user?.role === 'penjual' && (
              <div className="px-4 py-3 bg-blue-500 text-white rounded-2xl cursor-pointer font-bold mt-1">Tambah Produk +</div>
            )}
          </div>
        )}
      </div>

      {/* Auth Section */}
      <div className="relative" ref={authRef}>
        <button onClick={() => setIsAuthOpen(!isAuthOpen)} className={`p-3 rounded-2xl transition-all ${user ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-blue-500 hover:text-white'}`}>
          <i className={`fa-solid ${user ? 'fa-user' : 'fa-right-to-bracket'}`}></i>
        </button>
        {isAuthOpen && (
          <div className="absolute top-full right-0 mt-3 min-w-56 rounded-4xl border border-blue-50 bg-white shadow-2xl shadow-blue-900/10 overflow-hidden z-50 p-3">
            {user ? (
              <>
                <div className="px-4 py-2 mb-2 text-xs font-black text-blue-500 uppercase tracking-widest">Akun: {user.role}</div>
                <button onClick={handleLogout} className="w-full text-left px-4 py-3 bg-red-50 text-red-500 rounded-2xl font-bold hover:bg-red-500 hover:text-white transition-all">Log Out</button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="px-4 py-1 text-[10px] font-black text-gray-400 uppercase tracking-widest">Masuk Sebagai</div>
                <button onClick={() => handleLogin('pembeli')} className="w-full text-left px-4 py-3 bg-blue-50 text-blue-600 rounded-2xl font-bold hover:bg-blue-500 hover:text-white transition-all">🛒 Pembeli</button>
                <button onClick={() => handleLogin('penjual')} className="w-full text-left px-4 py-3 bg-blue-50 text-blue-600 rounded-2xl font-bold hover:bg-blue-500 hover:text-white transition-all">🏪 Penjual</button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavButton;