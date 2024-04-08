const Product = (props: productModel) => {
	const { title } = props;
	return (
		<>
			<div>Produkt: {title}</div>
		</>
	);
};

export default Product;
