function SearchBar({ value, onChange }) {
  return (
    <form className="searchBar" onSubmit={(event) => event.preventDefault()}>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search products"
        aria-label="Search products"
      />
    </form>
  );
}

export default SearchBar;
