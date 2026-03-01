import React from "react";

const ProductDetailModal = ({ isOpen, onClose, product, onAddToCart }) => {
    if (!isOpen || !product) return null;

    return (
        <div className="fixed inset-0 z-550 flex items-center justify-center p-4 bg-blue-900/60 backdrop-blur-lg animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-2xl rounded-[4rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in duration-300 border border-blue-50">

                {/* Area Gambar */}
                <div className="md:w-1/2 h-64 md:h-auto relative bg-gray-50">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover shadow-inner"
                    />
                    <div className="absolute top-6 left-6 bg-blue-500 text-white text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-widest shadow-lg">
                        {product.category}
                    </div>
                </div>

                {/* Area Detail Konten */}
                <div className="md:w-1/2 p-10 flex flex-col justify-between text-left">
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-4xl font-black text-gray-800 italic uppercase leading-none tracking-tighter">
                                {product.name}
                            </h2>
                            <button onClick={onClose} className="text-gray-300 hover:text-red-500 transition-colors">
                                <i className="fa-solid fa-circle-xmark text-2xl"></i>
                            </button>
                        </div>

                        <p className="text-blue-600 font-black text-3xl italic mb-6">
                            {product.price}
                        </p>

                        <div className="space-y-2 mb-8">
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest italic">Deskripsi Produk:</p>
                            <p className="text-gray-600 font-bold leading-relaxed italic text-lg">
                                {product.description || "Jajanan nikmat khas ICB Cinta Niaga. Dibuat dengan cinta oleh siswa kreatif untuk energi belajar kamu!"}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <button
                            onClick={() => { onAddToCart(product); onClose(); }}
                            className="w-full bg-blue-500 text-white py-5 rounded-full font-black shadow-xl shadow-blue-500/30 hover:bg-blue-600 transition-all uppercase text-lg active:scale-95 flex items-center justify-center gap-3"
                        >
                            <i className="fa-solid fa-cart-plus"></i>
                            Tambah Ke Pesanan
                        </button>
                        <button
                            onClick={onClose}
                            className="w-full text-gray-400 font-black py-2 uppercase text-xs tracking-widest hover:text-blue-500 transition-colors"
                        >
                            Kembali ke Etalase
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailModal;