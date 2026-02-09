function Card({ image, name, price, stock, description }) {
  return (
    <div className="group overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-md">
      {/* Container Gambar */}
      <div className="relative h-40 w-full overflow-hidden bg-gray-100">
        <img
          src={image || "https://placehold.co/400x300?text=Astra+Niaga"}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Konten Teks */}
      <div className="p-4">
        <h3 className="text-sm font-bold text-gray-800 line-clamp-1 group-hover:text-blue-500">
          {name}
        </h3>
        
        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm font-bold text-blue-500">
            Rp {Number(price).toLocaleString("id-ID")}
          </p>
          <span className="text-[10px] font-medium text-gray-400 italic">
            Stok: {stock}
          </span>
        </div>

        {description && (
          <p className="mt-2 text-[11px] text-gray-500 line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

export default Card;