import ProductTable from '../components/ProductTable';

const ProductList = ({ products, onChangeStock, onDelete }) => (
  <div>
    <h2>Danh sách sản phẩm</h2>
    <ProductTable
      products={products}
      onChangeStock={onChangeStock}
      onDelete={onDelete}
    />
  </div>
);

export default ProductList;