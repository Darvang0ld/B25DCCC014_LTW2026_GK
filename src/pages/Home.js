import { formatMoney } from '../data';

const Home = ({ products }) => {
  const totalProducts = products.length;
  const lowStockCount = products.filter((p) => p.stock < 5).length;
  // reduce: cộng dồn giá × tồn kho của từng sản phẩm
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);

  return (
    <div>
      <h1>Kho hàng</h1>
      <p>{`Tổng số sản phẩm: ${totalProducts}`}</p>
      <p>{`Số sản phẩm sắp hết hàng: ${lowStockCount} (tồn kho dưới 5)`}</p>
      <p>{`Tổng giá trị kho: ${formatMoney(totalValue)}`}</p>
    </div>
  );
};

export default Home;