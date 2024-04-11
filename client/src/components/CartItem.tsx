import { CartItemModel } from "../models";

const CartItem = (props: CartItemModel) => {
	const { quantity, product, removeFromCart } = props;

	const handleRemoveClick = () => {
		removeFromCart(product);
	};

	return (
		<>
			<div className="bg-light p-1 my-1">
				<img src={product.imageURL} height="50px" />
				<span className="badge bg-dark mx-2">{quantity} X</span>
				<span className="fw-bold mx-2"> {product.title}</span>
				<span className="badge bg-info mx-2">{product.price} SEK</span>
				<button
					className="btn btn-danger btn-sm py-0 float-end"
					onClick={handleRemoveClick}
				>
					X
				</button>
			</div>
		</>
	);
};

export default CartItem;
