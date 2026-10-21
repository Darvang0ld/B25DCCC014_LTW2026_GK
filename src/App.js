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

const STORAGE_KEY = 'gk_products';

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Mounting: đọc dữ liệu đã lưu, nếu không có thì gọi API
  useEffect(() => {
    // Có dữ liệu lưu trên trình duyệt thì dùng luôn, không gọi API
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setProducts(JSON.parse(saved));
        setLoading(false);
        return;
      }
    } catch (err) {
      // Dữ liệu lưu bị hỏng: bỏ qua và gọi API bình thường
    }

    const controller = new AbortController();

    axios
      .get('/data/products.json', { signal: controller.signal })
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        // Request bị hủy (unmount) thì bỏ qua, không đổi state
        if (axios.isCancel(err)) return;
        setError('Không tải được dữ liệu');
        setLoading(false);
      });

    // Unmounting: hủy request đang chạy
    return () => controller.abort();
  }, []);

  // Updating: lưu dữ liệu sau khi đã tải xong
  useEffect(() => {
    if (loading) return; // chưa tải xong thì không ghi đè bằng mảng rỗng
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products, loading]);

  // Tăng / giảm tồn kho (delta = +1 hoặc -1)
  const handleChangeStock = (id, delta) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: p.stock + delta } : p))
    );
  };

  // Xóa sản phẩm theo id
  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Thêm sản phẩm mới vào cuối danh sách, mã = mã lớn nhất + 1
  const handleAdd = (newProduct) => {
    setProducts((prev) => {
      const maxId = prev.reduce((max, p) => Math.max(max, p.id), 0);
      return [...prev, { ...newProduct, id: maxId + 1 }];
    });
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
          <Route path="products/new" element={<AddProduct onAdd={handleAdd} />} />
          <Route path="products/:id" element={<ProductDetail products={products} />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;