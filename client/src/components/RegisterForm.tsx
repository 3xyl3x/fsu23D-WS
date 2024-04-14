import { useState } from "react";
import { Mode, User } from "../models";

interface RegisterFormProps {
	setUser(user: User): void;
	setMode(mode: Mode): void;
}

const RegisterForm = (props: RegisterFormProps) => {
	const { setUser, setMode } = props;
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string>("");

	const register = async () => {
		let valid = true;
		if (name.length < 2) {
			setError("Name must be at least 2 characters long.");
			valid = true;
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			setError("Please enter a valid email address.");
			valid = true;
		}

		if (password.length < 8) {
			setError("Password must be at least 8 characters long.");
			valid = true;
		}

		if (!valid) return;

		try {
			const response = await fetch("http://localhost:3000/register", {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: name,
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
				setError("Registration failed. Please try again.");
			}
		} catch (error) {
			setError("Registration failed. Please try again later.");
		}
	};

	return (
		<>
			<h2>Register an account</h2>
			<form className="card p-2 bg-light">
				<div className="mb-3">
					<label htmlFor="inputName" className="form-label">
						Name
					</label>
					<input
						type="text"
						className="form-control"
						id="inputName"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
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
				<button type="button" onClick={register} className="btn btn-primary">
					Register
				</button>
			</form>
			<a href="#" onClick={() => setMode(Mode.Login)}>
				Have an account? Login here
			</a>
		</>
	);
};

export default RegisterForm;
