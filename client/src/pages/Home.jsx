import { useState, useEffect } from "react";
import Header from "../components/layout/Header/Header";
import NavButton from "../components/layout/Header/NavButton";
import SearchBar from "../components/layout/Header/SearchBar";
import Brand from "../components/layout/Header/Brand";
import Main from "../components/layout/Main";
import Footer from "../components/layout/Footer";

function Home() {
  // State untuk menampung data kategori dari database
  const [categories, setCategories] = useState([]);

  // Mengambil data dari backend saat halaman dimuat
  useEffect(() => {
    fetch("http://localhost:3000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Gagal mengambil kategori:", err));
  }, []);

  return (
    <div id="mainContent" className="bg-red-500">
      <Header>
        <Brand />
        <SearchBar />
        <NavButton />
      </Header>

      <Main>
        <section className="relative mb-10 flex h-48 w-full items-center overflow-hidden rounded bg-blue-500 px-8 text-white shadow-lg md:h-80 md:px-16">
          <div className="relative z-10">
            <h1 className="mb-2 text-2xl font-extrabold md:text-5xl">
              <span className="inline-block animate-pulse">Ad</span> Astra{" "}
              <span className="inline-block animate-pulse">per</span> Niaga
            </h1>
            <p className="max-w-md text-sm opacity-90 md:text-xl">
              Capai Bintang Melalui Niaga - Menaungi produk UMKM demi menggapai
              #indonesiaEmas2045!
            </p>
            <button className="mt-4 rounded bg-white px-6 py-2 font-bold text-blue-500 transition-all duration-200 hover:bg-gray-100">
              Belanja Sekarang
            </button>
          </div>
          {/* Dekorasi Abstract */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 h-64 w-64 rounded-full bg-white/10"></div>
          <div className="absolute right-20 bottom-0 -mb-10 h-32 w-32 rounded-full bg-white/10"></div>
        </section>

        {/* SECTION CATEGORY - Sekarang Dinamis dari Database */}
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
                  className="group cursor-pointer rounded border border-gray-200 bg-white p-4 text-center transition-all duration-200 hover:border-blue-500 hover:shadow-md"
                >
                  <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded bg-blue-50 text-blue-500 transition-all group-hover:bg-blue-500 group-hover:text-white">
                    <i className="fa-solid fa-tag"></i>
                  </div>
                  <span className="font-medium text-gray-700 capitalize">
                    {cat.name}
                  </span>
                </div>
              ))
            ) : (
              // Tampilan jika data sedang dimuat atau kosong
              <div className="col-span-full py-10 text-center text-gray-400 italic">
                Memuat kategori...
              </div>
            )}
          </div>
        </section>
      </Main>
      <Footer></Footer>
    </div>
  );
}

export default Home;
