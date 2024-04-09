import { useState } from "react";

import "bootstrap/dist/css/bootstrap.css";
import CartItem from "./components/CartItem";
import ProductList from "./components/ProductList";

function App() {
	const [cart, setCart] = useState<CartItemModel[]>([]);

	const handleAddToCart = (product: ProductModel) => {
		// Loop cart to find if item with that ID exist
		const findCartIndex = cart.findIndex(
			(item) => item.product.id === product.id
		);

		if (findCartIndex !== -1) {
			// Item exist, update quantity
			const updatedCart = [...cart];
			updatedCart[findCartIndex].quantity++;
			setCart(updatedCart);
		} else {
			// Item didn't exist, add item
			setCart([
				...cart,
				{ product: product, quantity: 1, removeFromCart: handleRemoveFromCart },
			]);
		}
	};

	const handleRemoveFromCart = (product: ProductModel) => {
		const updatedCart = cart.filter((item) => item.product.id !== product.id);
		setCart(updatedCart);
	};

	return (
		<>
			<h2>Produkter</h2>
			<ProductList addToCart={handleAddToCart} />
			<h2>Kundvagn</h2>
			{cart.map((item, index) => (
				<CartItem
					key={index}
					product={item.product}
					quantity={item.quantity}
					removeFromCart={handleRemoveFromCart}
				/>
			))}
		</>
	);
}

export default App;
