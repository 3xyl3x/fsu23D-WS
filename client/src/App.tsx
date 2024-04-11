import { useEffect, useState } from "react";

import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Shop from "./components/Shop";
import ProfileBar from "./components/ProfileBar";
import Confirm from "./components/Confirm";
import { Mode, User } from "./models";

function App() {
	const [user, setUser] = useState<User>();
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
				setUser(undefined);
				setMode(Mode.Login);
			}
		};
		authorize();
	}, []);

	useEffect(() => {
		if (window.location.href.includes("/confirm")) {
			setMode(Mode.Confirm);
		}
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
			{user && mode === "confirm" && <Confirm setMode={setMode} />}
			{user && <Shop />}
		</div>
	);
}

export default App;
