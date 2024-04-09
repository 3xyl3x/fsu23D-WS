import { useEffect, useState } from "react";
import Product from "./Product";

interface ProductListProps {
	addToCart(product: ProductModel): void;
}

const ProductList = (props: ProductListProps) => {
	const { addToCart } = props;
	const [products, setProducts] = useState<StripeProductModel[]>();

	useEffect(() => {
		const fetchProducts = async () => {
			const response = await fetch("http://localhost:3000/products");
			const data = await response.json();
			setProducts(data.data);
		};
		fetchProducts();
	}, []);

	return (
		<>
			<div className="row">
				{products?.map((product: StripeProductModel) => (
					<Product
						key={product.id}
						title={product.name}
						id={product.id}
						price={product.default_price.unit_amount / 100}
						imageURL={product.images[0]}
						addToCart={addToCart}
					/>
				))}
			</div>
		</>
	);
};

export default ProductList;
