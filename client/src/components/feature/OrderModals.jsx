import { useState } from "react";

// Modal Form Checkout
export const CheckoutModal = ({ isOpen, onClose, cart, onConfirm }) => {
    const [form, setForm] = useState({ nama: "", kelas: "" });
    if (!isOpen) return null;
    const total = cart.reduce((acc, item) => acc + (parseInt(item.price.replace(/[^0-9]/g, "")) || 0), 0);

    return (
        <div className="fixed inset-0 z-600 flex items-center justify-center p-6 bg-blue-900/40 backdrop-blur-md">
            <div className="bg-white w-full max-w-lg p-10 rounded-[3.5rem] shadow-2xl animate-in zoom-in duration-300 text-left">
                <h2 className="text-3xl font-black text-blue-500 mb-2 italic uppercase">PENGANTARAN</h2>
                <p className="text-gray-500 font-bold mb-8 uppercase italic">Mohon isi data dengan lengkap</p>
                <div className="space-y-4 mb-8">
                    <input required className="w-full px-8 py-5 bg-gray-50 rounded-full outline-none focus:ring-4 focus:ring-blue-100 font-bold border border-gray-100 text-lg" placeholder="Nama Lengkap..." onChange={e => setForm({ ...form, nama: e.target.value })} />
                    <input required className="w-full px-8 py-5 bg-gray-50 rounded-full outline-none focus:ring-4 focus:ring-blue-100 font-bold border border-gray-100 text-lg" placeholder="Kelas (Contoh: XI RPL 1)..." onChange={e => setForm({ ...form, kelas: e.target.value })} />
                    <div className="bg-blue-50 p-8 rounded-[2.5rem] border border-blue-100">
                        <p className="text-xs font-black text-blue-400 uppercase mb-2">Total Bayar Tunai:</p>
                        <p className="text-3xl font-black text-blue-600 italic">Rp {total.toLocaleString()}</p>
                    </div>
                    <p className="text-xs text-gray-400 italic px-4 font-bold">⚠️ Siapkan uang tunai pas untuk diserahkan saat pesanan tiba di kelas.</p>
                </div>
                <button onClick={() => onConfirm(form)} disabled={!form.nama || !form.kelas} className="w-full bg-blue-500 text-white py-5 rounded-full font-black shadow-lg hover:bg-blue-600 disabled:bg-gray-200 transition-all uppercase text-lg">Konfirmasi Pesanan</button>
                <button onClick={onClose} className="w-full text-gray-400 font-black py-4 uppercase mt-2">Batal</button>
            </div>
        </div>
    );
};

// Modal List View (Antrean & Riwayat)
export const ListViewModal = ({ isOpen, onClose, title, items, type, onAcc }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-450 flex items-center justify-center bg-blue-900/40 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-2xl p-10 rounded-[4rem] shadow-2xl flex flex-col animate-in slide-in-from-bottom duration-300 max-h-[85vh]">
                <h2 className="text-3xl font-black mb-8 italic uppercase text-left">{title} <span className="text-blue-500">{type}</span></h2>
                <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                    {items.length === 0 ? (
                        <p className="text-center text-gray-300 py-20 font-black italic uppercase text-xl">Belum ada data...</p>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="bg-gray-50 p-6 rounded-[3rem] border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-left">
                                <div>
                                    <div className="flex gap-2 mb-2">
                                        <span className="bg-blue-500 text-white text-[10px] px-4 py-1.5 rounded-full font-black uppercase">{item.kelas}</span>
                                        <span className="bg-white text-gray-500 text-[10px] px-4 py-1.5 rounded-full font-black uppercase border border-gray-100">{item.nama}</span>
                                    </div>
                                    <h4 className="font-black text-gray-800 text-lg italic uppercase">{item.products.map(p => p.name).join(", ")}</h4>
                                    <p className="text-blue-600 font-black text-xl italic mt-1">Rp {item.total.toLocaleString()}</p>
                                </div>
                                {onAcc && (
                                    <button onClick={() => onAcc(item.id)} className="bg-blue-500 text-white px-8 py-4 rounded-full font-black uppercase text-xs shadow-lg hover:bg-blue-600 transition-all">ACC SEKARANG</button>
                                )}
                            </div>
                        ))
                    )}
                </div>
                <button onClick={onClose} className="w-full bg-blue-500 text-white py-5 rounded-full font-black shadow-lg mt-8 transition-all uppercase text-lg">Oke, Mengerti</button>
            </div>
        </div>
    );
};