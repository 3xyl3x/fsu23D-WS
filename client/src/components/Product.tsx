import { ProductModel } from "../models";

const Product = (props: ProductModel) => {
	const { title, price, imageURL, addToCart } = props;
	const handleBuyClick = () => {
		addToCart(props);
	};

	return (
		<div className="col-6 col-md-4 p-2">
			<div className="card text-center h-100 mb-3">
				<h4>{title}</h4>
				<img className="img-fluid" src={imageURL} />
				<div className="position-absolute w-100 bottom-0">
					<br />

					<span className="badge bg-info mx-2 my-2">{price} SEK</span>
					<br />
					<button className="btn btn-success w-100" onClick={handleBuyClick}>
						Add to cart
					</button>
				</div>
			</div>
		</div>
	);
};

export default Product;
