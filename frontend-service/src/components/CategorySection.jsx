import ProductCard from './ProductCard.jsx';

function CategorySection({ category, products }) {
  if (!products.length) {
    return null;
  }

  return (
    <section className="categorySection">
      <div className="sectionHeader">
        <h2>{category}</h2>
        <span>{products.length}</span>
      </div>
      <div className="productGrid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default CategorySection;
