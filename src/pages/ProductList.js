import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FilterBar from '../components/FilterBar';
import ProductTable from '../components/ProductTable';

const ProductList = ({ products, onChangeStock, onDelete }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');

  // Thông báo sau khi thêm: đọc từ location.state (có thể không có)
  const location = useLocation();
  const [notice, setNotice] = useState(location.state?.message || '');

  // Xóa state khỏi lịch sử để F5 không hiện lại thông báo
  useEffect(() => {
    if (location.state?.message) {
      window.history.replaceState({}, '');
    }
  }, [location.state]);

  // Tự ẩn sau 3 giây; cleanup xóa timer khi rời trang
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(''), 3000);
    return () => clearTimeout(timer);
  }, [notice]);

  // Hàm xử lý khi gõ vào ô tìm kiếm (tên bắt buộc theo đề)
  const handleQueryShift = (e) => setQuery(e.target.value);

  const handleCategoryChange = (e) => setCategory(e.target.value);

  const keyword = query.trim().toLowerCase();
  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(keyword) &&
      (category === '' || p.category === category)
  );

  return (
    <div>
      {notice && (
        <div className="notice">
          <span>{notice}</span>
          <button onClick={() => setNotice('')}>×</button>
        </div>
      )}
      <h2>Danh sách sản phẩm</h2>
      <FilterBar
        query={query}
        onQueryChange={handleQueryShift}
        category={category}
        onCategoryChange={handleCategoryChange}
      />
      <p>{`Tìm thấy ${filtered.length} sản phẩm`}</p>
      {filtered.length === 0 ? (
        <p>Không có dữ liệu</p>
      ) : (
        <ProductTable
          products={filtered}
          onChangeStock={onChangeStock}
          onDelete={onDelete}
        />
      )}
    </div>
  );
};

export default ProductList;