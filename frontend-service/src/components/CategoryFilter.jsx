function CategoryFilter({ categories, selectedCategory, onSelectCategory, onClearCategory }) {
  if (!categories.length) {
    return null;
  }

  return (
    <nav className="categoryFilter" aria-label="Product categories">
      <button
        className={!selectedCategory ? 'active' : ''}
        type="button"
        onClick={onClearCategory}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          className={selectedCategory === category ? 'active' : ''}
          key={category}
          type="button"
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </nav>
  );
}

export default CategoryFilter;
