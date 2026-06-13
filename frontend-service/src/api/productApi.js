import axios from 'axios';

const productApiClient = axios.create({
  baseURL: import.meta.env.VITE_PRODUCT_SERVICE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function getProducts() {
  const response = await productApiClient.get('/products');
  return response.data;
}

export async function getProductById(id) {
  const response = await productApiClient.get(`/products/${id}`);
  return response.data;
}

export async function getProductsByCategory(categoryName) {
  const response = await productApiClient.get(`/products/category/${encodeURIComponent(categoryName)}`);
  return response.data;
}

export async function searchProducts(keyword) {
  const response = await productApiClient.get('/products/search', {
    params: { keyword },
  });
  return response.data;
}
