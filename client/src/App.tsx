import { useEffect, useState } from "react";

import CartItem from "./components/CartItem";
import ProductList from "./components/ProductList";
import RegisterForm from "./components/RegisterForm";

function App() {
	const [cart, setCart] = useState<CartItemModel[]>([]);
	const [user, setUser] = useState<string>("");

	useEffect(() => {
		const authorize = async () => {
			const response = await fetch("http://localhost:3000/authorize", {
				credentials: "include",
			});

			const data = await response.json();
			if (response.status === 200) {
				setUser(data);
			} else {
				setUser("");
			}
		};
		authorize();
	}, []);
	const login = async () => {
		const response = await fetch("http://localhost:3000/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				email: "testarrr@email.com",
				password: "12345678",
			}),
		});
		const data = await response.json();

		if (response.status === 200) {
			setUser(data);
		} else {
			setUser("");
		}
	};
	const logout = async () => {
		const response = await fetch("http://localhost:3000/logout", {
			method: "POST",
			credentials: "include",
		});

		if (response.status === 200) {
			setUser("");
		}
	};

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
		<div className="container">
			{user ? (
				<div>
					<button onClick={logout}>Logout</button>
				</div>
			) : (
				<div>
					<button onClick={login}>Login</button> <RegisterForm />
				</div>
			)}

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
		</div>
	);
}

export default App;
