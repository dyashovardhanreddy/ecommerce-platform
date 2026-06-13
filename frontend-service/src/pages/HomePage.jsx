import { useEffect, useMemo, useState } from 'react';
import CategoryFilter from '../components/CategoryFilter.jsx';
import CategorySection from '../components/CategorySection.jsx';
import ProductCard from '../components/ProductCard.jsx';
import SearchBar from '../components/SearchBar.jsx';
import { getProducts, getProductsByCategory, searchProducts } from '../api/productApi.js';

function groupProductsByCategory(products) {
  return products.reduce((groups, product) => {
    const category = product.category || 'Uncategorized';
    return {
      ...groups,
      [category]: [...(groups[category] || []), product],
    };
  }, {});
}

function HomePage() {
  const [allProducts, setAllProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const categories = useMemo(
    () => [...new Set(allProducts.map((product) => product.category).filter(Boolean))].sort(),
    [allProducts],
  );

  const groupedProducts = useMemo(() => groupProductsByCategory(visibleProducts), [visibleProducts]);
  const isFilteredView = Boolean(searchValue.trim() || selectedCategory);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError('');
        const products = await getProducts();
        setAllProducts(products);
        setVisibleProducts(products);
      } catch (apiError) {
        setError(apiError.response?.data?.message || 'Unable to load products.');
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  async function handleSearchChange(nextValue) {
    setSearchValue(nextValue);
    setSelectedCategory('');

    if (!nextValue.trim()) {
      setVisibleProducts(allProducts);
      return;
    }

    try {
      setLoading(true);
      setError('');
      const products = await searchProducts(nextValue.trim());
      setVisibleProducts(products);
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Unable to search products.');
    } finally {
      setLoading(false);
    }
  }

  async function handleCategorySelect(category) {
    setSelectedCategory(category);
    setSearchValue('');

    try {
      setLoading(true);
      setError('');
      const products = await getProductsByCategory(category);
      setVisibleProducts(products);
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Unable to load category products.');
    } finally {
      setLoading(false);
    }
  }

  function handleClearCategory() {
    setSelectedCategory('');
    setSearchValue('');
    setVisibleProducts(allProducts);
  }

  return (
    <main className="pageShell">
      <header className="topBar">
        <div>
          <p className="eyebrow">Order Platform</p>
          <h1>Products</h1>
        </div>
        <SearchBar value={searchValue} onChange={handleSearchChange} />
      </header>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
        onClearCategory={handleClearCategory}
      />

      {loading && <p className="statusMessage">Loading products...</p>}
      {error && <p className="errorMessage">{error}</p>}

      {!loading && !error && visibleProducts.length === 0 && (
        <p className="statusMessage">No products found.</p>
      )}

      {!loading && !error && visibleProducts.length > 0 && isFilteredView && (
        <section className="categorySection">
          <div className="sectionHeader">
            <h2>{selectedCategory || 'Search results'}</h2>
            <span>{visibleProducts.length}</span>
          </div>
          <div className="productGrid">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {!loading && !error && visibleProducts.length > 0 && !isFilteredView && (
        Object.entries(groupedProducts).map(([category, products]) => (
          <CategorySection key={category} category={category} products={products} />
        ))
      )}
    </main>
  );
}

export default HomePage;
