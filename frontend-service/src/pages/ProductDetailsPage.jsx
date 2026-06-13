import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ImagePlaceholder from '../components/ImagePlaceholder.jsx';
import { getProductById } from '../api/productApi.js';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        setError('');
        const productDetails = await getProductById(id);
        setProduct(productDetails);
      } catch (apiError) {
        setError(apiError.response?.data?.message || 'Unable to load product details.');
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  const hasImage = Boolean(product?.imageUrl?.trim());

  return (
    <main className="pageShell">
      <button className="backButton" type="button" onClick={() => navigate('/')}>
        Back to products
      </button>

      {loading && <p className="statusMessage">Loading product...</p>}
      {error && <p className="errorMessage">{error}</p>}

      {!loading && !error && product && (
        <section className="detailsLayout">
          <div className="detailsMedia">
            {hasImage ? (
              <img src={product.imageUrl} alt={product.name} />
            ) : (
              <ImagePlaceholder label={`${product.name} image unavailable`} />
            )}
          </div>
          <div className="detailsContent">
            <p className="productCategory">{product.category}</p>
            <h1>{product.name}</h1>
            <p className="detailsPrice">{currencyFormatter.format(Number(product.price || 0))}</p>
            <p className="detailsDescription">{product.description}</p>
          </div>
        </section>
      )}
    </main>
  );
}

export default ProductDetailsPage;
