import { ProductModel } from "../models";

const Product = (props: ProductModel) => {
	const { title, price, imageURL, addToCart } = props;
	const handleBuyClick = () => {
		addToCart(props);
	};

	return (
		<div className="col-6 col-md-2 p-2">
			<div className="card text-center h-100 mb-3">
				<h4>{title}</h4>
				<img className="img-fluid" src={imageURL} />
				<div className="position-absolute w-100 bottom-0">
					<br />
					<b>{price} SEK</b>
					<br />
					<button className="btn btn-success w-100" onClick={handleBuyClick}>
						Lägg i kundvagn
					</button>
				</div>
			</div>
		</div>
	);
};

export default Product;
