import { useEffect, useState } from "react";
import Product from "./Product";
import { ProductModel, StripeProductModel } from "../models";

interface ProductListProps {
	addToCart(product: ProductModel): void;
}

const ProductList = (props: ProductListProps) => {
	const { addToCart } = props;
	const [products, setProducts] = useState<StripeProductModel[]>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProducts = async () => {
			const response = await fetch("http://localhost:3000/products");
			const data = await response.json();
			setProducts(data.data);
			setLoading(false);
		};
		fetchProducts();
	}, []);

	return (
		<>
			{loading ? (
				<div className="spinner-border text-primary" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
			) : (
				<div className="row">
					{products?.map((product: StripeProductModel) => (
						<Product
							key={product.id}
							title={product.name}
							id={product.id}
							price={product.default_price.unit_amount / 100}
							priceID={product.default_price.id}
							imageURL={product.images[0]}
							addToCart={addToCart}
						/>
					))}
				</div>
			)}
		</>
	);
};

export default ProductList;
