import { Link } from 'react-router-dom';
import ImagePlaceholder from './ImagePlaceholder.jsx';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function ProductCard({ product }) {
  const hasImage = Boolean(product.imageUrl?.trim());

  return (
    <Link className="productCard" to={`/products/${product.id}`}>
      <div className="productCardMedia">
        {hasImage ? (
          <img src={product.imageUrl} alt={product.name} loading="lazy" />
        ) : (
          <ImagePlaceholder label={`${product.name} image unavailable`} />
        )}
      </div>
      <div className="productCardBody">
        <p className="productCategory">{product.category}</p>
        <h3>{product.name}</h3>
        <p className="productPrice">{currencyFormatter.format(Number(product.price || 0))}</p>
      </div>
    </Link>
  );
}

export default ProductCard;
