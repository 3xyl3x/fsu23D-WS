import { useState } from "react";
import { CartItemModel, ProductModel } from "../models";
import CartItem from "./CartItem";
import ProductList from "./ProductList";

const Shop = () => {
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

	const handlePayment = async () => {
		const response = await fetch("http://localhost:3000/checkout", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify([
				{
					product: "price_1P3YmKDiN1OMEJy41JBpzRZU",
					quantity: 3,
				},
				{
					product: "price_1P3YlrDiN1OMEJy4jSp8szV1",
					quantity: 1,
				},
			]),
		});
		const data = await response.json();
		localStorage.setItem("sessionId", JSON.stringify(data.sessionId));
		window.location = data.url;
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

			<button onClick={handlePayment}>Pay</button>
		</>
	);
};

export default Shop;
