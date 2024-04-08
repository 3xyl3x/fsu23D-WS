import { useState } from "react";

import "./App.css";
import Product from "./components/Product";

function App() {
	const [cart, setCart] = useState<cartModel[]>();

	return (
		<>
			<h2>Produkter</h2>

			<Product title="Stol" />
			<Product title="Cykel" />
		</>
	);
}

export default App;
