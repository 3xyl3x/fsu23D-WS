import { useEffect, useState } from "react";
import { CartItemModel, Mode, ProductModel } from "./models";

import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Shop from "./components/Shop";
import ProfileBar from "./components/ProfileBar";

function App() {
	const [user, setUser] = useState<string>("");
	const [mode, setMode] = useState<Mode>(Mode.Loading);

	useEffect(() => {
		const authorize = async () => {
			setMode(Mode.Loading);
			const response = await fetch("http://localhost:3000/authorize", {
				credentials: "include",
			});

			const data = await response.json();
			if (response.status === 200) {
				console.log(data);
				setUser(data);
				setMode(Mode.Shop);
			} else {
				setUser("");
				setMode(Mode.Login);
			}
		};
		authorize();
	}, []);

	return (
		<div className="container">
			{mode === "loading" && <div>Loading</div>}
			{!user && mode === "login" && (
				<LoginForm setUser={setUser} setMode={setMode} />
			)}
			{!user && mode === "register" && (
				<RegisterForm setUser={setUser} setMode={setMode} />
			)}
			{user && <ProfileBar user={user} setUser={setUser} setMode={setMode} />}
			{user && <Shop />}
		</div>
	);
}

export default App;
