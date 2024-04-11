import { useState } from "react";
import { Mode, User } from "../models";

interface LoginFormProps {
	setUser(user: User): void;
	setMode(mode: Mode): void;
}

const LoginForm = (props: LoginFormProps) => {
	const { setUser, setMode } = props;
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string>("");

	const login = async () => {
		try {
			const response = await fetch("http://localhost:3000/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({
					email: email,
					password: password,
				}),
			});

			if (response.ok) {
				const data = await response.json();
				setUser(data);
				setMode(Mode.Shop);
				setError("");
			} else {
				setError("Invalid email or password.");
			}
		} catch (error) {
			console.error("Login error:", error);
			setError("Login failed. Please try again later."); // Set error message for other errors
		}
	};

	return (
		<>
			<h2>Login</h2>
			<form className="card p-2 bg-light">
				<div className="mb-3">
					<label htmlFor="inputEmail" className="form-label">
						Email address
					</label>
					<input
						type="email"
						className="form-control"
						id="inputEmail"
						aria-describedby="emailHelp"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="inputPassword" className="form-label">
						Password
					</label>
					<input
						type="password"
						className="form-control"
						id="inputPassword"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				{error && (
					<div className="alert alert-danger" role="alert">
						{error}
					</div>
				)}
				<button type="button" onClick={login} className="btn btn-primary">
					Login
				</button>
			</form>

			<a href="#" onClick={() => setMode(Mode.Register)}>
				No account? Create one here
			</a>
		</>
	);
};

export default LoginForm;
