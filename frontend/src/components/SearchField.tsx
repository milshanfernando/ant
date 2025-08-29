const SearchField = () => {
  return (
    <div className="relative w-1/3 md:w-full">
      <input
        type="text"
        className="
      p-2 pr-8 md:pr-16 rounded-md border border-gray-200 md:w-full 
      focus:outline-none focus:ring-2 focus:ring-gray-400
      focus:border-transparent dark:bg-gray-950 dark:text-gray-100 
      dark:border-gray-600
    "
        placeholder="Search..."
      />
      <button
        className="
      absolute right-2 top-1
      bg-blue-700 text-white rounded-md px-3 py-1 
      hover:bg-blue-800 transition
    "
      >
        Find
      </button>
    </div>
  );
};

export default SearchField;
