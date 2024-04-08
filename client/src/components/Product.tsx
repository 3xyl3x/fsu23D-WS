interface productInterface {
	title: string;
}
const Product = (props: productInterface) => {
	const { title } = props;
	return (
		<>
			<div>Produkt: {title}</div>
		</>
	);
};

export default Product;
