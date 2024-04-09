const Product = (props: ProductModel) => {
	const { title, id, price, addToCart } = props;
	const handleBuyClick = () => {
		addToCart(props);
	};

	return (
		<>
			<div>
				ID: {id} |Produkt: {title} | Pris: {price} SEK
				<button onClick={handleBuyClick}>Köp</button>
			</div>
		</>
	);
};

export default Product;
