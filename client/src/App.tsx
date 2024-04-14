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
				setUser(data);
				if (localStorage.getItem("sessionId")) {
					setMode(Mode.Confirm);
				} else setMode(Mode.Shop);
			} else {
				setUser(undefined);
				setMode(Mode.Login);
			}
		};
		authorize();
	}, []);

	return (
		<div className="container">
			{mode === Mode.Loading && (
				<div className="spinner-border text-primary" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
			)}

			{!user && mode === Mode.Login && (
				<LoginForm setUser={setUser} setMode={setMode} />
			)}
			{!user && mode === Mode.Register && (
				<RegisterForm setUser={setUser} setMode={setMode} />
			)}
			{user && <ProfileBar user={user} setUser={setUser} setMode={setMode} />}
			{user && mode === Mode.Confirm && <Confirm setMode={setMode} />}
			{user && mode === Mode.Shop && <Shop />}
		</div>
	);
}

export default App;
