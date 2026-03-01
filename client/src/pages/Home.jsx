import { useState, useEffect } from "react";
import Header from "../components/layout/Header/Header";
import Brand from "../components/layout/Header/Brand";
import Main from "../components/layout/Main";
import AddProductForm from "../components/feature/AddProductForm";

// ==========================================
// MODAL: INFO & DETAIL (About Us, Promo, Detail)
// ==========================================
const InfoModal = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-blue-900/40 backdrop-blur-md">
      <div className="bg-white w-full max-w-lg p-10 rounded-[3.5rem] shadow-2xl border border-blue-50 animate-in zoom-in duration-300">
        <h2 className="text-3xl font-black text-blue-500 mb-4 italic uppercase tracking-tighter">{title}</h2>
        <p className="text-gray-600 leading-relaxed font-medium mb-8">{content}</p>
        <button onClick={onClose} className="w-full bg-blue-500 text-white py-4 rounded-full font-black shadow-lg hover:bg-blue-600 transition-all uppercase">Oke, Mengerti</button>
      </div>
    </div>
  );
};

// ==========================================
// MODAL: KERANJANG BELANJA (DITAMBAHKAN KEMBALI)
// ==========================================
const CartModal = ({ isOpen, onClose, cart, setCart }) => {
  if (!isOpen) return null;
  const total = cart.reduce((acc, item) => acc + (parseInt(item.price.replace(/[^0-9]/g, "")) || 0), 0);
  
  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center bg-blue-900/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md p-10 rounded-[3.5rem] shadow-2xl flex flex-col animate-in slide-in-from-bottom duration-300">
        <h2 className="text-2xl font-black mb-6 italic uppercase text-gray-800 text-left">PESANAN <span className="text-blue-500">SAYA</span></h2>
        <div className="flex-1 overflow-y-auto space-y-4 max-h-[350px] mb-8 pr-2">
          {cart.length === 0 ? (
            <p className="text-center text-gray-400 py-10 font-bold italic">Belum ada pesanan...</p>
          ) : (
            cart.map((item) => (
              <div key={item.cartId} className="flex items-center gap-4 bg-blue-50 p-4 rounded-[2rem] border border-blue-100">
                <img src={item.image} className="w-14 h-14 rounded-2xl object-cover bg-white" alt="" />
                <div className="flex-1 text-left">
                  <h4 className="font-bold text-[10px] line-clamp-1 uppercase">{item.name}</h4>
                  <p className="text-blue-600 font-black text-xs">{item.price}</p>
                </div>
                <button onClick={() => {
                  const n = cart.filter(i => i.cartId !== item.cartId);
                  setCart(n);
                  localStorage.setItem("cart", JSON.stringify(n));
                }} className="text-red-400 p-2"><i className="fa-solid fa-trash-can"></i></button>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center px-4 font-black text-gray-800 uppercase text-xs">
              <span>Total:</span>
              <span className="text-blue-600 text-xl">Rp {total.toLocaleString()}</span>
            </div>
            <button onClick={() => { alert("Pesanan Terkirim!"); setCart([]); localStorage.removeItem("cart"); onClose(); }} className="w-full bg-blue-500 text-white py-5 rounded-full font-black shadow-xl uppercase tracking-widest">Checkout</button>
          </div>
        )}
        <button onClick={onClose} className="mt-4 text-gray-400 text-[10px] font-black uppercase py-2">Tutup</button>
      </div>
    </div>
  );
};

// ==========================================
// COMPONENT: HAMBURGER / USER MENU
// ==========================================
const UserMenu = ({ isOpen, onClose, user, onLogin, onLogout }) => {
  if (!isOpen) return null;
  return (
    <div className="absolute top-20 right-6 z-[250] w-64 bg-white rounded-[2.5rem] shadow-2xl border border-blue-50 p-6 animate-in slide-in-from-top-5 duration-300">
      <div className="space-y-3">
        {!user ? (
          <>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4 mb-2">Masuk Sebagai</p>
            <button onClick={() => { onLogin('pembeli'); onClose(); }} className="w-full text-left px-6 py-4 rounded-full bg-blue-50 text-blue-600 font-bold hover:bg-blue-500 hover:text-white transition-all">🛍️ Pembeli (Siswa)</button>
            <button onClick={() => { onLogin('penjual'); onClose(); }} className="w-full text-left px-6 py-4 rounded-full bg-blue-50 text-blue-600 font-bold hover:bg-blue-500 hover:text-white transition-all">👨‍🏫 Penjual (Admin)</button>
          </>
        ) : (
          <>
            <div className="px-4 py-2 mb-2">
              <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Status Login</p>
              <p className="font-bold text-gray-800 uppercase italic text-left">{user.role}</p>
            </div>
            <button onClick={() => { onLogout(); onClose(); }} className="w-full text-left px-6 py-4 rounded-full bg-red-50 text-red-500 font-bold hover:bg-red-500 hover:text-white transition-all font-black uppercase italic text-xs tracking-widest">Log Out</button>
          </>
        )}
      </div>
    </div>
  );
};

// ==========================================
// HALAMAN UTAMA (HOME)
// ==========================================
export default function Home() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [infoModal, setInfoModal] = useState({ open: false, title: "", content: "" });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3001/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) { console.error("Gagal koneksi server!"); }
    finally { setLoading(false); }
  };

  const deleteProduct = async (e, id) => {
    e.stopPropagation(); 
    if (!window.confirm("Hapus produk ini dari etalase?")) return;
    try {
      const res = await fetch(`http://localhost:3001/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) fetchData();
    } catch (err) { alert("Gagal menghapus!"); }
  };

  const addToCart = (product) => {
    if (user?.role !== 'pembeli') return alert("Harap login sebagai Pembeli!");
    const newCart = [...cart, { ...product, cartId: Date.now() }];
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  useEffect(() => {
    fetchData();
    setUser(JSON.parse(localStorage.getItem("user")));
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  const handleLogin = (role) => {
    const userData = { role: role };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 overflow-x-hidden">
      <Header>
        <div className="flex items-center justify-between w-full gap-6">
          <Brand />

          <div className="flex-1 max-w-lg relative hidden md:block text-left">
            <input
              type="text"
              placeholder="Cari jajanan ICB..."
              className="w-full px-8 py-3 bg-gray-100/50 border-2 border-transparent focus:border-blue-500/20 rounded-full outline-none focus:bg-white transition-all font-medium italic"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3 relative">
            <button
              onClick={() => setInfoModal({ open: true, title: "TENTANG KAMI", content: "Astra Niaga ICB adalah platform UMKM Digital siswa SMKS ICB Cinta Niaga." })}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white transition-all shadow-sm"
              title="About Us"
            >
              <i className="fa-solid fa-circle-info text-lg"></i>
            </button>

            <button
              onClick={() => setInfoModal({ open: true, title: "PROMO HARI INI", content: "Beli 2 gratis senyuman di kantin ICB!" })}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white transition-all shadow-sm"
              title="Promo"
            >
              <i className="fa-solid fa-tag text-lg"></i>
            </button>

            {user?.role === 'pembeli' && (
              <button onClick={() => setIsCartOpen(true)} className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 text-white shadow-lg shadow-blue-500/30 relative">
                <i className="fa-solid fa-cart-shopping text-sm"></i>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full border-2 border-white">{cart.length}</span>
              </button>
            )}

            <div className="h-8 w-[2px] bg-gray-100 mx-1"></div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`w-12 h-12 flex items-center justify-center rounded-full transition-all ${isMenuOpen ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
            >
              <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars-staggered'} text-lg`}></i>
            </button>

            <UserMenu
              isOpen={isMenuOpen}
              onClose={() => setIsMenuOpen(false)}
              user={user}
              onLogin={handleLogin}
              onLogout={handleLogout}
            />
          </div>
        </div>
      </Header>

      <Main>
        <div className="max-w-7xl mx-auto py-12 px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 text-left">
            <div>
              <h2 className="text-6xl font-black italic tracking-tighter uppercase leading-none">
                {user?.role === 'penjual' ? <>DASHBOARD <span className="text-blue-500">SELLER</span></> : <>UMKM <span className="text-blue-500">NIAGA</span></>}
              </h2>
              <p className="text-gray-400 font-bold mt-3 tracking-[0.3em] text-[10px] uppercase italic">SMKS ICB Cinta Niaga Bandung</p>
            </div>
            {user?.role === 'penjual' && (
              <button onClick={() => setIsFormOpen(true)} className="bg-blue-500 text-white px-10 py-5 rounded-[2.5rem] font-black shadow-2xl shadow-blue-500/30 uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
                + Item Baru
              </button>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center py-40"><div className="w-16 h-16 border-8 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {filteredProducts.map(product => (
                <div key={product.id} className="group bg-white p-8 rounded-[4rem] shadow-xl shadow-blue-900/5 hover:shadow-2xl transition-all border border-transparent hover:border-blue-100 text-left relative">

                  {user?.role === 'penjual' && (
                    <button
                      onClick={(e) => deleteProduct(e, product.id)}
                      className="absolute top-10 right-10 z-[100] bg-white/90 backdrop-blur-md text-red-500 w-14 h-14 rounded-full shadow-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all active:scale-90 border border-red-50"
                    >
                      <i className="fa-solid fa-trash-can text-lg"></i>
                    </button>
                  )}

                  <div className="relative overflow-hidden rounded-[3rem] aspect-square bg-gray-50 mb-8">
                    <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000" alt="" />
                    <div className="absolute top-6 left-6 bg-blue-500 text-white text-[9px] font-black px-6 py-2.5 rounded-full uppercase shadow-lg tracking-widest">{product.category}</div>
                  </div>

                  <div className="px-2">
                    <h3 className="text-2xl font-bold mb-6 group-hover:text-blue-500 transition-colors line-clamp-1 italic uppercase">{product.name}</h3>
                    <div className="flex items-center justify-between bg-blue-50/50 p-6 rounded-[2.5rem] group-hover:bg-blue-50 transition-colors border border-blue-50">
                      <span className="text-2xl font-black text-blue-600">{product.price}</span>
                      <button onClick={() => addToCart(product)} className="bg-blue-500 text-white p-5 rounded-[1.8rem] hover:bg-blue-600 shadow-lg shadow-blue-500/20 active:scale-90 transition-all">
                        <i className="fa-solid fa-cart-plus text-xl"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Main>

      <InfoModal isOpen={infoModal.open} title={infoModal.title} content={infoModal.content} onClose={() => setInfoModal({ ...infoModal, open: false })} />
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart} setCart={setCart} />
      <AddProductForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onRefresh={fetchData} />
    </div>
  );
}