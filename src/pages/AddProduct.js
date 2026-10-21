import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../data';

const AddProduct = ({ onAdd }) => {
  const navigate = useNavigate();

  // Form controlled: mọi ô nhập lưu trong state
  const [name, setName] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]); // mặc định: Văn phòng phẩm
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra ô trống
    if (name.trim() === '' || price === '' || stock === '') {
      setMessage('Vui lòng nhập đầy đủ thông tin');
      return;
    }

        const priceNum = Number(price);
    const stockNum = Number(stock);

    // Giá phải > 0; số lượng phải là số nguyên >= 0
    if (!(priceNum > 0) || !Number.isInteger(stockNum) || stockNum < 0) {
      setMessage('Giá phải lớn hơn 0, số lượng là số nguyên không âm');
      return;
    }

    setMessage('');
    onAdd({
      name: name.trim(),
      category,
      price: priceNum,
      stock: stockNum,
    });

    // replace: true để nút Back không quay lại form
    navigate('/products', { replace: true });
  };

  return (
    <div>
      <h2>Thêm sản phẩm</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="name">Tên sản phẩm</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label htmlFor="category">Danh mục</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label htmlFor="price">Giá</label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label htmlFor="stock">Số lượng tồn</label>
          <input
            id="stock"
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>

        <button type="submit">Thêm</button>
        {message && <p className="error">{message}</p>}
      </form>
    </div>
  );
};

export default AddProduct;