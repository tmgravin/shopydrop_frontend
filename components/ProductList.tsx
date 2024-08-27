interface Product {
  code: string;
  product_name: string;
}

interface ProductListProps {
  products: Product[];
  onSelect: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onSelect }) => {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.code}>
          <span>{product.product_name}</span>
          <button onClick={() => onSelect(product)}>Select</button>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
