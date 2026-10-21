import { Link } from 'react-router-dom';
import { formatMoney } from '../data';

const ProductRow = ({ product, onChangeStock, onDelete }) => {
  const { id, name, category, price, stock } = product;
  const isLow = stock < 5;

  return (
    <tr className={isLow ? 'low-stock' : ''}>
      <td>
        <Link to={`/products/${id}`}>{name}</Link>
      </td>
      <td>{category}</td>
      <td>{formatMoney(price)}</td>
      <td>{stock}</td>
      <td>
        <button onClick={() => onChangeStock(id, 1)}>+</button>{' '}
        <button onClick={() => onChangeStock(id, -1)} disabled={stock === 0}>
          -
        </button>{' '}
        <button onClick={() => onDelete(id)}>Xóa</button>
      </td>
    </tr>
  );
};

export default ProductRow;