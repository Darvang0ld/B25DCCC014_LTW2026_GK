import { useParams, useNavigate } from 'react-router-dom';
import { formatMoney } from '../data';

const ProductDetail = ({ products }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Number('abc') là NaN nên find() không thấy gì, rơi vào nhánh "không tìm thấy"
  const product = products.find((p) => p.id === Number(id));

  return (
    <div>
      {product ? (
        <div>
          <h2>Chi tiết sản phẩm</h2>
          <p>Tên sản phẩm: {product.name}</p>
          <p>Danh mục: {product.category}</p>
          <p>Giá: {formatMoney(product.price)}</p>
          <p>Tồn kho: {product.stock}</p>
        </div>
      ) : (
        <p>Không tìm thấy sản phẩm</p>
      )}
      <button onClick={() => navigate(-1)}>Quay lại</button>
    </div>
  );
};

export default ProductDetail;