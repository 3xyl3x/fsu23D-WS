import { useEffect, useState } from "react";
import { CartItemModel, ProductModel } from "../models";
import CartItem from "./CartItem";
import ProductList from "./ProductList";

const Shop = () => {
	const [cart, setCart] = useState<CartItemModel[]>([]);

	useEffect(() => {
		// Load cart from localstorage when component mounts,
		const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
		setCart((prevCart) => (prevCart.length === 0 ? savedCart : prevCart));
	}, []);

	useEffect(() => {
		// Save cart when it changes
		localStorage.setItem("cart", JSON.stringify(cart));
	}, [cart]);

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
		const cartItems = cart.map((item) => ({
			product: item.product.priceID,
			quantity: item.quantity,
		}));

		try {
			const response = await fetch("http://localhost:3000/checkout", {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(cartItems),
			});

			if (response.ok) {
				const data = await response.json();
				localStorage.setItem("sessionId", JSON.stringify(data.sessionId));
				window.location = data.url;
			} else {
				console.error("Createing checkout session failed");
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const totalSum = cart.reduce(
		(acc, item) => acc + item.product.price * item.quantity,
		0
	);

	return (
		<div className="col-12 row">
			<div className="col-12 col-md-6 ">
				<h2 className="border-bottom text-center">Products</h2>
				<ProductList addToCart={handleAddToCart} />
			</div>
			<div className="col-12 col-md-6 ">
				<h2 className="border-bottom text-center">Cart</h2>
				{cart.map((item, index) => (
					<CartItem
						key={index}
						product={item.product}
						quantity={item.quantity}
						removeFromCart={handleRemoveFromCart}
					/>
				))}

				{cart.length > 0 && (
					<button className="btn btn-success w-100" onClick={handlePayment}>
						Pay ({totalSum} SEK)
					</button>
				)}
			</div>
		</div>
	);
};

export default Shop;
