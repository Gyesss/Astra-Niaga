import { useState } from "react";

export default function AddProductForm({ isOpen, onClose, onRefresh }) {
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        image: "",
        category: "Makanan" // Default kategori UMKM sekolah
    });

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3001/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                alert("Produk UMKM Berhasil Disimpan!");
                onRefresh();
                onClose();
            }
        } catch (err) {
            alert("Gagal koneksi ke server Astra Niaga (Port 3001)!");
        }
    };

    return (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-6 bg-blue-900/20 backdrop-blur-md">
            <div className="bg-white w-full max-w-md p-8 rounded-[3rem] shadow-2xl border border-blue-100 animate-in fade-in zoom-in duration-300">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-black text-gray-800 italic uppercase">TAMBAH <span className="text-blue-500">PRODUK UMKM</span></h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-blue-500 transition-colors italic font-bold">Tutup</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 text-left">
                    <div>
                        <label className="block text-[10px] font-black text-blue-400 uppercase tracking-widest ml-4 mb-1">Nama Produk Siswa</label>
                        <input
                            required
                            className="w-full px-6 py-4 bg-gray-50 border-none rounded-full focus:ring-2 focus:ring-blue-500 transition-all outline-none text-gray-700 font-medium"
                            placeholder="Contoh: Keripik Pedas ICB"
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-black text-blue-400 uppercase tracking-widest ml-4 mb-1">Harga</label>
                            <input
                                required
                                className="w-full px-6 py-4 bg-gray-50 border-none rounded-full focus:ring-2 focus:ring-blue-500 outline-none text-gray-700 font-medium"
                                placeholder="Rp 10.000"
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-blue-400 uppercase tracking-widest ml-4 mb-1">Kategori</label>
                            <select
                                className="w-full px-6 py-4 bg-gray-50 border-none rounded-full focus:ring-2 focus:ring-blue-500 outline-none text-gray-700 font-medium appearance-none"
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option>Makanan</option>
                                <option>Minuman</option>
                                <option>Kerajinan</option>
                                <option>Jasa Desain</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] font-black text-blue-400 uppercase tracking-widest ml-4 mb-1">URL Foto Produk</label>
                        <input
                            required
                            className="w-full px-6 py-4 bg-gray-50 border-none rounded-full focus:ring-2 focus:ring-blue-500 outline-none text-gray-700 font-medium"
                            placeholder="https://link-foto-produk.jpg"
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        />
                    </div>

                    <button type="submit" className="w-full bg-blue-500 text-white py-5 rounded-full font-black shadow-xl shadow-blue-200 hover:bg-blue-600 hover:scale-[1.02] active:scale-95 transition-all mt-4 tracking-widest uppercase">
                        Posting ke Astra Niaga
                    </button>
                </form>
            </div>
        </div>
    );
}