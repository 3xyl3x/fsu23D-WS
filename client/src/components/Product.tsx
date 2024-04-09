const Product = (props: ProductModel) => {
	const { title, id, price, imageURL, addToCart } = props;
	const handleBuyClick = () => {
		addToCart(props);
	};

	return (
		<div className="bg-white">
			<h4>{title}</h4>
			<img src={imageURL} width={"100px"} />
			<br />
			{price} SEK
			<br />
			<button onClick={handleBuyClick}>Lägg i kundvagn</button>
		</div>
	);
};

export default Product;
