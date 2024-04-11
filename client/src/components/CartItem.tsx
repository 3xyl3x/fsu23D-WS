import { CartItemModel } from "../models";

const CartItem = (props: CartItemModel) => {
	const { quantity, product, removeFromCart } = props;

	const handleRemoveClick = () => {
		removeFromCart(product);
	};

	return (
		<>
			<div>
				Produkt: {product.title}, antal: {quantity}{" "}
				<button onClick={handleRemoveClick}>Ta bort</button>
			</div>
		</>
	);
};

export default CartItem;
