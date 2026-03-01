function SearchBar({ onSearch }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const value = e.target.value;
      // Simpan ke Web Storage (LocalStorage)
      localStorage.setItem("astra_last_search", value);

      // Kirim data ke parent jika onSearch disediakan
      if (onSearch) onSearch(value);

      console.log(`Pencarian "${value}" disimpan ke LocalStorage!`);
    }
  };

  // Mengambil nilai awal dari storage untuk input
  const initialValue = localStorage.getItem("astra_last_search") || "";

  return (
    <input
      type="search"
      name="searchbar"
      id="searchbar"
      defaultValue={initialValue}
      onKeyDown={handleKeyDown}
      placeholder="Cari kebutuhan Astra Niaga di sini... :3"
      className="h-11 w-1/4 md:w-1/2 p-4 bg-gray-100 outline-none transition-all duration-500 
                 rounded-full border-2 border-transparent
                 hover:ring-8 hover:ring-blue-500/10 
                 focus:border-blue-500 focus:bg-white focus:ring-8 focus:ring-blue-500/15"
    />
  );
}

export default SearchBar;