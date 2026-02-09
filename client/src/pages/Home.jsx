import { useState, useEffect } from "react";
import Header from "../components/layout/Header/Header";
import NavButton from "../components/layout/Header/NavButton";
import SearchBar from "../components/layout/Header/SearchBar";
import Brand from "../components/layout/Header/Brand";
import Main from "../components/layout/Main";
import Footer from "../components/layout/Footer";

function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mengambil Kategori
    fetch("http://localhost:3000/api/service/categories")
      .then((res) => res.json())
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Gagal mengambil kategori:", err));

    // Mengambil Produk
    fetch("http://localhost:3000/api/service/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil produk:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div id="mainContent" className="bg-gray-50 min-h-screen">
      <Header>
        <Brand />
        <SearchBar />
        <NavButton />
      </Header>

      <Main>
        {/* HERO SECTION */}
        <section className="relative mb-10 flex h-48 w-full items-center overflow-hidden rounded-xl bg-blue-500 px-8 text-white shadow-lg md:h-80 md:px-16">
          <div className="relative z-10">
            <h1 className="mb-2 text-2xl font-extrabold md:text-5xl">
              <span className="inline-block animate-pulse">Ad</span> Astra{" "}
              <span className="inline-block animate-pulse">per</span> Niaga
            </h1>
            <p className="max-w-md text-sm opacity-90 md:text-xl">
              Capai Bintang Melalui Niaga - Menaungi produk UMKM demi menggapai
              #indonesiaEmas2045!
            </p>
            <button className="mt-4 rounded-xl bg-white px-6 py-2 font-bold text-blue-500 transition-all duration-200 hover:bg-gray-100">
              Belanja Sekarang
            </button>
          </div>
          <div className="absolute top-0 right-0 -mt-20 -mr-20 h-64 w-64 rounded-full bg-white/10"></div>
          <div className="absolute right-20 bottom-0 -mb-10 h-32 w-32 rounded-full bg-white/10"></div>
        </section>

        {/* SECTION CATEGORY */}
        <section className="mb-10">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-800">
            <i className="fa-solid fa-layer-group text-blue-500"></i>
            Kategori Populer
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
            {categories.length > 0 ? (
              categories.map((cat) => (
                <div
                  key={cat.id}
                  className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-4 text-center transition-all duration-200 hover:border-blue-500 hover:shadow-md"
                >
                  <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-500 transition-all group-hover:bg-blue-500 group-hover:text-white">
                    <i className="fa-solid fa-tag"></i>
                  </div>
                  <span className="font-bold text-gray-700 capitalize">
                    {cat.name}
                  </span>
                </div>
              ))
            ) : (
              <div className="col-span-full py-10 text-center text-gray-400 italic">
                Memuat kategori...
              </div>
            )}
          </div>
        </section>

        {/* SECTION PRODUCT CARDS */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 border-l-4 border-blue-500 pl-3">
              Produk Terbaru
            </h2>
            <button className="text-sm font-bold text-blue-500 hover:underline">Lihat Semua</button>
          </div>

          {loading ? (
            <div className="text-center py-20 text-blue-500 font-bold italic">
              Memuat produk...
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {products.length > 0 ? (
                products.map((product) => (
                  <div 
                    key={product.id} 
                    className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md hover:border-blue-300"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                      <img
                        src={product.image_url || "https://via.placeholder.com/300?text=No+Image"}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute top-2 left-2">
                        <span className="rounded-lg bg-blue-500 px-2 py-1 text-[10px] font-bold text-white uppercase shadow-sm">
                          {product.category_name || "Produk"}
                        </span>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-1 flex-col p-3">
                      <h3 className="mb-1 line-clamp-2 text-sm font-bold text-gray-700 group-hover:text-blue-600">
                        {product.name}
                      </h3>
                      
                      <div className="mt-auto">
                        <p className="text-base font-black text-blue-600">
                          Rp {Number(product.price).toLocaleString("id-ID")}
                        </p>
                        
                        <div className="mt-2 flex items-center justify-between border-t border-gray-50 pt-2">
                          <span className="text-[11px] text-gray-500 italic">
                            Stok: <span className="font-bold text-gray-700">{product.stock}</span>
                          </span>
                          <button className="rounded-lg bg-blue-50 p-2 text-blue-600 transition-colors hover:bg-blue-500 hover:text-white">
                            <i className="fa-solid fa-cart-plus text-xs"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                  <i className="fa-solid fa-box-open text-4xl text-gray-200 mb-3"></i>
                  <p className="text-gray-400 italic">Belum ada produk tersedia.</p>
                </div>
              )}
            </div>
          )}
        </section>
      </Main>
      <Footer />
    </div>
  );
}

export default Home;