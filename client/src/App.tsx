import { useState } from "react";

import "./App.css";
import Product from "./components/Product";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<h2>Produkter</h2>

			<Product title="Stol" />
			<Product title="Cykel" />
		</>
	);
}

export default App;
