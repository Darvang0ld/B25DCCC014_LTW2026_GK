const BUILD_TAG = "kt-6641";
/* eslint-disable import/first */
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import AddProduct from './pages/AddProduct';
import ProductDetail from './pages/ProductDetail';

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Mounting: tải dữ liệu từ API đúng 1 lần khi mở ứng dụng
  useEffect(() => {
    const controller = new AbortController();

    axios
      .get('/data/products.json', { signal: controller.signal })
      .then((res) => setProducts(res.data))
      .catch(() => setError('Không tải được dữ liệu'))
      .finally(() => setLoading(false));
  }, []);

  // Tăng / giảm tồn kho (delta = +1 hoặc -1), không sửa trực tiếp state
  const handleChangeStock = (id, delta) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: p.stock + delta } : p))
    );
  };

  // Xóa sản phẩm theo id
  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="app" data-build={BUILD_TAG}>
      <Routes>
        <Route path="/" element={<Layout loading={loading} error={error} />}>
          <Route index element={<Home products={products} />} />
          <Route
            path="products"
            element={
              <ProductList
                products={products}
                onChangeStock={handleChangeStock}
                onDelete={handleDelete}
              />
            }
          />
          <Route path="products/new" element={<AddProduct />} />
          <Route path="products/:id" element={<ProductDetail products={products} />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;