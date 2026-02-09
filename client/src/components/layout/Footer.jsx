import Brand from "./Header/Brand";

function Footer() {
  return (
    <footer className="bg-white px-4 pt-16 pb-8 md:px-8 lg:px-16 xl:px-32">
      <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <Brand></Brand>
          <p className="text-sm leading-relaxed text-gray-500">
            Capai Bintang Melalui Niaga - Menaungi produk UMKM demi menggapai
            #indonesiaEmas2045!
          </p>
          <div className="flex gap-4 text-gray-400">
            <i className="fa-brands fa-instagram cursor-pointer text-xl transition-colors hover:text-blue-500"></i>
            <i className="fa-brands fa-facebook cursor-pointer text-xl transition-colors hover:text-blue-500"></i>
            <i className="fa-brands fa-twitter cursor-pointer text-xl transition-colors hover:text-blue-500"></i>
          </div>
        </div>

        <div>
          <h3 className="mb-6 font-bold text-gray-800">Tautan Cepat</h3>
          <ul className="flex flex-col gap-3 text-sm text-gray-500">
            <li className="cursor-pointer transition-colors hover:text-blue-500">
              Semua Produk
            </li>
            <li className="cursor-pointer transition-colors hover:text-blue-500">
              Kategori Terpopuler
            </li>
            <li className="cursor-pointer transition-colors hover:text-blue-500">
              Tentang Kami
            </li>
            <li className="cursor-pointer transition-colors hover:text-blue-500">
              Syarat & Ketentuan
            </li>
          </ul>
        </div>

        {/* Kolom 3: Bantuan */}
        <div>
          <h3 className="mb-6 font-bold text-gray-800">Pusat Bantuan</h3>
          <ul className="flex flex-col gap-3 text-sm text-gray-500">
            <li className="cursor-pointer transition-colors hover:text-blue-500">
              Cara Belanja
            </li>
            <li className="cursor-pointer transition-colors hover:text-blue-500">
              Pengiriman
            </li>
            <li className="cursor-pointer transition-colors hover:text-blue-500">
              Kebijakan Pengembalian
            </li>
            <li className="cursor-pointer transition-colors hover:text-blue-500">
              Hubungi Kami
            </li>
          </ul>
        </div>

        {/* Kolom 4: Newsletter */}
        <div>
          <h3 className="mb-6 font-bold text-gray-800">Berlangganan</h3>
          <p className="mb-4 text-sm text-gray-500">
            Dapatkan info promo terbaru langsung di email Anda.
          </p>
          <div className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Email Anda"
              className="rounded border border-gray-200 bg-gray-50 px-4 py-2 text-sm transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button className="rounded bg-blue-500 py-2 text-sm font-bold text-white transition-all duration-200 hover:bg-blue-600">
              Daftar
            </button>
          </div>
        </div>
      </div>

      {/* Baris Bawah: Copyright */}
      <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-8 md:flex-row">
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-gray-600">Astra Niaga</span>.
          Seluruh Hak Cipta Dilindungi.
        </p>
        <div className="flex gap-6 opacity-50 grayscale">
          <i className="fa-brands fa-cc-visa text-2xl"></i>
          <i className="fa-brands fa-cc-mastercard text-2xl"></i>
          <i className="fa-solid fa-money-bill-transfer text-2xl"></i>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
