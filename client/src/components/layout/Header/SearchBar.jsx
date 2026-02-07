function SearchBar() {
  return (
    <input
      type="search"
      name="searchbar"
      id="searchbar"
      placeholder="Search whatever you want here! :3"
      className="h-10 w-1/4 md:w-1/2 rounded bg-gray-100 p-2 outline-1 transition-all duration-500 hover:ring-8 hover:ring-blue-500/20 focus:outline-2 focus:outline-blue-500/20"
    />
  );
}

export default SearchBar;
