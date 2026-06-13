import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage.jsx';
import ProductDetailsPage from '../pages/ProductDetailsPage.jsx';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products/:id" element={<ProductDetailsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
