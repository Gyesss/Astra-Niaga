import { useState, useEffect, useRef } from "react";
import Header from "../components/layout/Header/Header";
import Brand from "../components/layout/Header/Brand";
import Main from "../components/layout/Main";
import AddProductForm from "../components/feature/AddProductForm";
import { CheckoutModal, ListViewModal } from "../components/feature/OrderModals";

// ==========================================
// MODAL: INFO (TENTANG & PROMO)
// ==========================================
const InfoModal = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-700 flex items-center justify-center p-6 bg-blue-900/40 backdrop-blur-md">
      <div className="bg-white w-full max-w-lg p-10 rounded-[3.5rem] shadow-2xl border border-blue-50 animate-in zoom-in duration-300 text-left">
        <h2 className="text-3xl font-black text-blue-500 mb-4 italic uppercase tracking-tighter">{title}</h2>
        <p className="text-gray-600 leading-relaxed font-bold text-xl mb-8 italic">{content}</p>
        <button onClick={onClose} className="w-full bg-blue-500 text-white py-5 rounded-full font-black shadow-lg hover:bg-blue-600 transition-all uppercase text-lg">Oke, Mengerti</button>
      </div>
    </div>
  );
};

// ==========================================
// MODAL: KERANJANG (FONT & SCROLL FIXED)
// ==========================================
const CartModal = ({ isOpen, onClose, cart, setCart, onCheckout }) => {
  if (!isOpen) return null;
  const total = cart.reduce((acc, item) => acc + (parseInt(item.price.replace(/[^0-9]/g, "")) || 0), 0);

  return (
    <div className="fixed inset-0 z-400 flex items-center justify-center bg-blue-900/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md p-10 rounded-[3.5rem] shadow-2xl flex flex-col animate-in slide-in-from-bottom duration-300 max-h-[90vh]">
        <h2 className="text-2xl font-black mb-6 italic uppercase text-gray-800 text-left">PESANAN <span className="text-blue-500">SAYA</span></h2>

        {/* Kontainer Scrollable agar tombol tidak keluar viewport */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-8 pr-2 custom-scrollbar">
          {cart.length === 0 ? (
            <p className="text-center text-gray-400 py-10 font-bold italic uppercase">Belum ada pesanan...</p>
          ) : (
            cart.map((item) => (
              <div key={item.cartId} className="flex items-center gap-4 bg-blue-50 p-5 rounded-[2.5rem] border border-blue-100">
                <img src={item.image} className="w-16 h-16 rounded-2xl object-cover bg-white" alt="" />
                <div className="flex-1 text-left">
                  <h4 className="font-black text-sm uppercase text-gray-700 line-clamp-1">{item.name}</h4>
                  <p className="text-blue-600 font-black text-lg italic">{item.price}</p>
                </div>
                <button onClick={() => {
                  const n = cart.filter(i => i.cartId !== item.cartId);
                  setCart(n);
                  localStorage.setItem("cart", JSON.stringify(n));
                }} className="text-red-400 p-3 hover:bg-red-50 rounded-full transition-all"><i className="fa-solid fa-trash-can"></i></button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center px-4 font-black text-gray-800 uppercase">
              <span className="text-sm italic">Total:</span>
              <span className="text-blue-600 text-2xl italic">Rp {total.toLocaleString()}</span>
            </div>
            <button onClick={onCheckout} className="w-full bg-blue-500 text-white py-5 rounded-full font-black shadow-xl uppercase text-lg hover:bg-blue-600 transition-all">Checkout Sekarang</button>
          </div>
        )}
        <button onClick={onClose} className="mt-4 text-gray-400 font-black uppercase text-xs">Tutup</button>
      </div>
    </div>
  );
};

// ==========================================
// USER MENU (CLICK OUTSIDE & FONT SIZE)
// ==========================================
const UserMenu = ({ isOpen, onClose, user, onLogin, onLogout }) => {
  const menuRef = useRef();

  useEffect(() => {
    const handler = (e) => { if (isOpen && !menuRef.current.contains(e.target)) onClose(); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div ref={menuRef} className="absolute top-20 right-0 z-250 w-72 bg-white rounded-[2.5rem] shadow-2xl border border-blue-50 p-6 animate-in slide-in-from-top-5 duration-300">
      <div className="space-y-4">
        {!user ? (
          <>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest ml-4 italic text-left">Masuk Sebagai</p>
            <button onClick={() => onLogin('pembeli')} className="w-full text-left px-8 py-5 rounded-full bg-blue-50 text-blue-600 font-black hover:bg-blue-500 hover:text-white transition-all uppercase italic text-sm">🛍️ Pembeli (Siswa)</button>
            <button onClick={() => onLogin('penjual')} className="w-full text-left px-8 py-5 rounded-full bg-blue-50 text-blue-600 font-black hover:bg-blue-500 hover:text-white transition-all uppercase italic text-sm">👨‍🏫 Penjual (Admin)</button>
          </>
        ) : (
          <>
            <div className="px-6 py-2">
              <p className="text-xs font-black text-blue-500 uppercase italic">Status Login</p>
              <p className="font-black text-gray-800 uppercase italic text-xl text-left">{user.role}</p>
            </div>
            <button onClick={onLogout} className="w-full text-left px-8 py-5 rounded-full bg-red-50 text-red-500 font-black hover:bg-red-500 hover:text-white transition-all uppercase italic text-sm">Log Out</button>
          </>
        )}
      </div>
    </div>
  );
};

// ==========================================
// HOME COMPONENT
// ==========================================
export default function Home() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  // States Modal (Hanya satu yang terbuka di satu waktu)
  const [activeModal, setActiveModal] = useState(null); // 'info', 'cart', 'menu', 'form', 'checkout', 'list'
  const [modalData, setModalData] = useState({ title: "", content: "", type: "", items: [], onAcc: null });

  const API_URL = "http://localhost:3001/api";

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/products`);
      const data = await res.json();
      setProducts(data);
    } catch { console.error("Server Down!"); }
    finally { setLoading(false); }
  };

  useEffect(() => {
    fetchData();
    setUser(JSON.parse(localStorage.getItem("user")));
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  // --- ACTIONS (Jendela Tunggal Logic) ---
  const closeAll = () => setActiveModal(null);
  const openInfo = (title, content) => { closeAll(); setModalData({ title, content }); setActiveModal('info'); };
  const openCart = () => { closeAll(); setActiveModal('cart'); };
  const openMenu = () => { setActiveModal(activeModal === 'menu' ? null : 'menu'); };
  const openCheckout = () => { closeAll(); setActiveModal('checkout'); };

  const sendOrder = async (customerInfo) => {
    const total = cart.reduce((acc, item) => acc + (parseInt(item.price.replace(/[^0-9]/g, "")) || 0), 0);
    try {
      const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...customerInfo, products: cart, total })
      });
      if (res.ok) {
        alert("Pesanan Masuk! Tunggu di kelas ya.");
        setCart([]); localStorage.removeItem("cart"); closeAll();
      }
    } catch { alert("Gagal kirim pesanan!"); }
  };

  const handleAcc = async (id) => {
    await fetch(`${API_URL}/orders/acc/${id}`, { method: 'POST' });
    closeAll();
  };

  const showList = async (type) => {
    closeAll();
    const endpoint = type === 'antrean' ? 'orders' : 'transactions';
    const res = await fetch(`${API_URL}/${endpoint}`);
    const data = await res.json();
    setModalData({
      title: type === 'antrean' ? 'ANTREAN' : 'RIWAYAT',
      type: 'PESANAN',
      items: data,
      onAcc: type === 'antrean' ? handleAcc : null
    });
    setActiveModal('list');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 overflow-x-hidden text-left">
      <Header>
        <div className="flex items-center justify-between w-full gap-6">
          <Brand />
          <div className="flex-1 max-w-lg hidden md:block">
            <input type="text" placeholder="Cari jajanan..." className="w-full px-8 py-3 bg-gray-100/50 rounded-full outline-none focus:bg-white font-bold italic border-2 border-transparent focus:border-blue-100" onChange={(e) => setSearchQuery(e.target.value)} />
          </div>

          <div className="flex items-center gap-3 relative">
            <button onClick={() => openInfo("TENTANG KAMI", "Platform UMKM Digital ICB Cinta Niaga.")} className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white transition-all shadow-sm"><i className="fa-solid fa-circle-info text-xl"></i></button>
            <button onClick={() => openInfo("PROMO HARI INI", "Beli 2 gratis senyuman di kantin!")} className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white transition-all shadow-sm"><i className="fa-solid fa-tag text-xl"></i></button>

            {/* Login Required Buttons */}
            {user && (
              <>
                {user.role === 'penjual' && (
                  <button onClick={() => showList('antrean')} className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-50 text-orange-500 hover:bg-orange-500 hover:text-white transition-all shadow-sm"><i className="fa-solid fa-bell-concierge"></i></button>
                )}
                <button onClick={() => showList('riwayat')} className="w-12 h-12 flex items-center justify-center rounded-full bg-green-50 text-green-500 hover:bg-green-500 hover:text-white transition-all shadow-sm"><i className="fa-solid fa-receipt"></i></button>
              </>
            )}

            {user?.role === 'pembeli' && (
              <button onClick={openCart} className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 text-white shadow-lg relative active:scale-90 transition-all">
                <i className="fa-solid fa-cart-shopping text-sm"></i>
                {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full border-2 border-white">{cart.length}</span>}
              </button>
            )}

            <div className="h-8 w-2px bg-gray-100 mx-1"></div>

            {/* Hamburger with X toggle */}
            <button onClick={openMenu} className={`w-12 h-12 flex items-center justify-center rounded-full transition-all ${activeModal === 'menu' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
              <i className={`fa-solid ${activeModal === 'menu' ? 'fa-xmark' : 'fa-bars-staggered'} text-xl`}></i>
            </button>

            <UserMenu isOpen={activeModal === 'menu'} onClose={closeAll} user={user} onLogin={(r) => { setUser({ role: r }); localStorage.setItem("user", JSON.stringify({ role: r })); closeAll(); }} onLogout={() => { setUser(null); localStorage.removeItem("user"); closeAll(); }} />
          </div>
        </div>
      </Header>

      <Main>
        <div className="max-w-7xl mx-auto py-12 px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-6xl font-black italic tracking-tighter uppercase leading-none">{user?.role === 'penjual' ? <>DASHBOARD <span className="text-blue-500">SELLER</span></> : <>UMKM <span className="text-blue-500">NIAGA</span></>}</h2>
              <p className="text-gray-400 font-black mt-3 tracking-[0.3em] text-[10px] uppercase italic">SMKS ICB Cinta Niaga Bandung</p>
            </div>
            {user?.role === 'penjual' && <button onClick={() => setActiveModal('form')} className="bg-blue-500 text-white px-10 py-5 rounded-[2.5rem] font-black shadow-2xl shadow-blue-500/30 uppercase hover:scale-105 active:scale-95 transition-all tracking-widest">+ Item Baru</button>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).map(product => (
              <div key={product.id} className="group bg-white p-8 rounded-[4rem] shadow-xl shadow-blue-900/5 hover:shadow-2xl transition-all border border-transparent hover:border-blue-100 relative">
                {user?.role === 'penjual' && (
                  <button onClick={async () => { if (window.confirm("Hapus?")) { await fetch(`${API_URL}/products/${product.id}`, { method: 'DELETE' }); fetchData(); } }} className="absolute top-10 right-10 z-100 bg-white/90 text-red-500 w-14 h-14 rounded-full shadow-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all border border-red-50"><i className="fa-solid fa-trash-can"></i></button>
                )}
                <div className="relative overflow-hidden rounded-[3rem] aspect-square bg-gray-50 mb-8 shadow-inner"><img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000" alt="" /></div>
                <div className="px-2">
                  <h3 className="text-2xl font-black mb-6 group-hover:text-blue-500 transition-colors line-clamp-1 italic uppercase tracking-tighter">{product.name}</h3>
                  <div className="flex items-center justify-between bg-blue-50/50 p-6 rounded-[2.5rem] group-hover:bg-blue-50 transition-colors border border-blue-50">
                    <span className="text-2xl font-black text-blue-600 tracking-tighter italic">{product.price}</span>
                    <button onClick={() => { if (user?.role === 'pembeli') { const n = [...cart, { ...product, cartId: Date.now() }]; setCart(n); localStorage.setItem("cart", JSON.stringify(n)); } else { alert("Login sebagai Pembeli!"); } }} className="bg-blue-500 text-white p-5 rounded-[1.8rem] hover:bg-blue-600 shadow-lg active:scale-90 transition-all"><i className="fa-solid fa-cart-plus text-xl"></i></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Main>

      {/* MODALS RENDERING */}
      <InfoModal isOpen={activeModal === 'info'} title={modalData.title} content={modalData.content} onClose={closeAll} />
      <CartModal isOpen={activeModal === 'cart'} onClose={closeAll} cart={cart} setCart={setCart} onCheckout={openCheckout} />
      <CheckoutModal isOpen={activeModal === 'checkout'} onClose={closeAll} cart={cart} onConfirm={sendOrder} />
      <ListViewModal isOpen={activeModal === 'list'} onClose={closeAll} title={modalData.title} type={modalData.type} items={modalData.items} onAcc={modalData.onAcc} />
      <AddProductForm isOpen={activeModal === 'form'} onClose={closeAll} onRefresh={fetchData} />
    </div>
  );
}