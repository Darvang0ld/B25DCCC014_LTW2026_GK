import { useState } from 'react';
import FilterBar from '../components/FilterBar';
import ProductTable from '../components/ProductTable';

const ProductList = ({ products, onChangeStock, onDelete }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');

  // Hàm xử lý khi gõ vào ô tìm kiếm (tên bắt buộc theo đề)
  const handleQueryShift = (e) => setQuery(e.target.value);

  const handleCategoryChange = (e) => setCategory(e.target.value);

  // Hai điều kiện áp dụng cùng lúc
  const keyword = query.trim().toLowerCase();
  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(keyword) &&
      (category === '' || p.category === category)
  );

  return (
    <div>
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