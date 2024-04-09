import Product from "./Product";

interface ProductListProps {
	addToCart(product: ProductModel): void;
}

const ProductList = (props: ProductListProps) => {
	const { addToCart } = props;

	return (
		<>
			<Product title="Cykel" id="d123" price={299} addToCart={addToCart} />
			<Product title="handduk" id="asd21" price={299} addToCart={addToCart} />
		</>
	);
};

export default ProductList;
