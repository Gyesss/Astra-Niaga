import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Main from "../components/layout/Main";
import Header from "../components/layout/Header/Header";
import Brand from "../components/layout/Header/Brand";
import SearchBar from "../components/layout/Header/SearchBar";
import NavButton from "../components/layout/Header/NavButton";
import Footer from "../components/layout/Footer";
import Card from "../components/ui/Card";

function Dashboard() {
  const navigate = useNavigate();

  // --- STATE UTAMA ---
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [activeTab, setActiveTab] = useState("profile");
  const [myProducts, setMyProducts] = useState([]);

  // Memoized Profile Data untuk menghindari re-render tidak perlu
  const initialProfile = useMemo(() => ({
    id: user?.id || "",
    username: user?.username || "",
    email: user?.email || "",
    full_name: user?.full_name || "",
    phone_number: user?.phone_number || "",
    profile_picture: user?.profile_picture || "",
    password: user?.password || "",
  }), [user]);

  const [profileData, setProfileData] = useState(initialProfile);
  
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    image_url: "",
  });

  // --- EFFECT: AUTH & FETCH DATA ---
  useEffect(() => {
    // Proteksi Route
    if (!user) {
      navigate("/");
      return;
    }

    // Logic Fetch Produk (Hanya saat tab produk aktif)
    const getProducts = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/service/products/mine/${user.id}`);
        if (!res.ok) throw new Error("Gagal mengambil data");
        const data = await res.json();
        setMyProducts(data);
      } catch (error) {
        console.error("Error Fetching Products:", error);
      }
    };

    if (activeTab === "my-products") {
      getProducts();
    }
  }, [user, navigate, activeTab]);

  // --- HANDLERS ---
  const handleUpdateProfile = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/service/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        alert("Profil diperbarui!");
      }
    } catch {
      alert("Gagal update profil. Cek koneksi backend.");
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const payload = { 
        ...productData, 
        seller_id: user.id, 
        price: Number(productData.price), 
        stock: Number(productData.stock) 
      };
      
      const res = await fetch("http://localhost:3000/api/service/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      const data = await res.json();
      if (data.success) {
        alert("🚀 Produk berhasil ditayangkan!");
        setProductData({ name: "", price: "", stock: "", description: "", image_url: "" });
        setActiveTab("my-products"); // Pindah tab agar user bisa lihat hasilnya
      } else {
        alert(`Gagal: ${data.message}`);
      }
    } catch {
      alert("Gagal terhubung ke server.");
    }
  };

  if (!user) return null;

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header>
        <Brand />
        <SearchBar />
        <NavButton />
      </Header>

      <Main>
        {/* Banner Welcome */}
        <div className="mt-4 mb-6 rounded-xl border-l-4 border-l-blue-500 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">
            Halo, <span className="text-blue-500">{user.full_name || user.username}</span>! 👋
          </h1>
          <p className="text-sm font-medium text-gray-500 italic">Dashboard Astra Niaga</p>
        </div>

        <div className="flex flex-col gap-6 pb-12 md:flex-row">
          {/* Sidebar Navigation */}
          <aside className="flex w-full flex-col gap-2 md:w-64">
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-3 rounded-xl border p-3 transition-all ${
                activeTab === "profile" 
                ? "bg-blue-500 text-white shadow-lg" 
                : "bg-white text-gray-700 hover:bg-blue-50"
              }`}
            >
              <i className="fa-solid fa-id-card w-5"></i> Profil Saya
            </button>

            {user.role === "seller" && (
              <>
                <button
                  onClick={() => setActiveTab("my-products")}
                  className={`flex items-center gap-3 rounded-xl border p-3 transition-all ${
                    activeTab === "my-products" 
                    ? "bg-blue-500 text-white shadow-lg" 
                    : "bg-white text-gray-700 hover:bg-blue-50"
                  }`}
                >
                  <i className="fa-solid fa-box w-5"></i> Produk Saya
                </button>
                <button
                  onClick={() => setActiveTab("add-product")}
                  className={`flex items-center gap-3 rounded-xl border p-3 transition-all ${
                    activeTab === "add-product" 
                    ? "bg-blue-500 text-white shadow-lg" 
                    : "bg-white text-gray-700 hover:bg-blue-50"
                  }`}
                >
                  <i className="fa-solid fa-plus w-5"></i> Tambah Barang
                </button>
              </>
            )}
          </aside>

          {/* Main Content Area */}
          <main className="min-h-[450px] flex-1 rounded-xl border bg-white p-6 shadow-sm">
            
            {/* Tab: Profil */}
            {activeTab === "profile" && (
              <div className="animate-in fade-in flex max-w-2xl flex-col gap-6 duration-500">
                <h2 className="text-xl font-bold text-blue-500">Informasi Profil</h2>
                <div className="flex items-center gap-6 rounded-xl border border-blue-100 bg-blue-50 p-5">
                  <img
                    src={profileData.profile_picture || `https://ui-avatars.com/api/?name=${user.username}&background=3b82f6&color=fff`}
                    className="h-20 w-20 rounded-full border-4 border-white object-cover shadow-md"
                    alt="avatar"
                  />
                  <div className="flex flex-1 flex-col gap-1">
                    <label className="text-xs font-bold text-blue-600 uppercase">URL Foto Profil</label>
                    <input
                      type="text"
                      className="w-full rounded-lg border p-2 outline-none focus:ring-2 focus:ring-blue-500"
                      value={profileData.profile_picture}
                      onChange={(e) => setProfileData({ ...profileData, profile_picture: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-600 italic">Nama Lengkap</label>
                    <input
                      type="text"
                      className="rounded-lg border p-2 outline-none focus:ring-2 focus:ring-blue-500"
                      value={profileData.full_name}
                      onChange={(e) => setProfileData({ ...profileData, full_name: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-600 italic">No. Telepon</label>
                    <input
                      type="text"
                      className="rounded-lg border p-2 outline-none focus:ring-2 focus:ring-blue-500"
                      value={profileData.phone_number}
                      onChange={(e) => setProfileData({ ...profileData, phone_number: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-600 italic">Password</label>
                  <input
                    type="password"
                    className="rounded-lg border p-2 outline-none focus:ring-2 focus:ring-blue-500"
                    value={profileData.password}
                    onChange={(e) => setProfileData({ ...profileData, password: e.target.value })}
                  />
                </div>

                <button
                  onClick={handleUpdateProfile}
                  className="rounded-xl bg-blue-500 py-3 font-bold text-white shadow-md transition-all hover:bg-blue-600 active:scale-95"
                >
                  Simpan Perubahan
                </button>
              </div>
            )}

            {/* Tab: Produk Saya (Menggunakan Card.jsx) */}
            {activeTab === "my-products" && (
              <div className="animate-in fade-in flex flex-col gap-6 duration-500">
                <h2 className="text-xl font-bold text-blue-500">Daftar Produk Saya</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {myProducts.length > 0 ? (
                    myProducts.map((p) => (
                      <Card 
                        key={p.id}
                        image={p.image_url}
                        name={p.name}
                        price={p.price}
                        stock={p.stock}
                        description={p.description}
                      />
                    ))
                  ) : (
                    <p className="col-span-full py-10 text-center text-gray-400 italic">
                      Belum ada produk yang kamu jual.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Tab: Tambah Barang */}
            {activeTab === "add-product" && (
              <div className="animate-in slide-in-from-right duration-500">
                <h2 className="mb-6 text-xl font-bold text-blue-500">Jual Produk Baru</h2>
                <form onSubmit={handleAddProduct} className="flex max-w-2xl flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Nama Barang"
                    required
                    className="rounded-lg border p-2 outline-none focus:ring-2 focus:ring-blue-500"
                    value={productData.name}
                    onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                  />
                  
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <input
                      type="number"
                      placeholder="Harga (Rp)"
                      required
                      className="rounded-lg border p-2 outline-none focus:ring-2 focus:ring-blue-500"
                      value={productData.price}
                      onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                    />
                    <input
                      type="number"
                      placeholder="Stok"
                      required
                      className="rounded-lg border p-2 outline-none focus:ring-2 focus:ring-blue-500"
                      value={productData.stock}
                      onChange={(e) => setProductData({ ...productData, stock: e.target.value })}
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Link Gambar Produk (URL)"
                    className="rounded-lg border p-2 outline-none focus:ring-2 focus:ring-blue-500"
                    value={productData.image_url}
                    onChange={(e) => setProductData({ ...productData, image_url: e.target.value })}
                  />

                  <textarea
                    placeholder="Deskripsi Barang"
                    className="h-32 resize-none rounded-lg border p-2 outline-none focus:ring-2 focus:ring-blue-500"
                    value={productData.description}
                    onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                  ></textarea>

                  <button
                    type="submit"
                    className="rounded-xl bg-blue-500 py-3 font-bold text-white shadow-md transition-all hover:bg-blue-600 active:scale-95"
                  >
                    Tayangkan Produk
                  </button>
                </form>
              </div>
            )}
          </main>
        </div>
      </Main>
      <Footer />
    </div>
  );
}

export default Dashboard;