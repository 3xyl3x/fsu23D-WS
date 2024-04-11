import { useState } from "react";
import { Mode } from "../models";

interface RegisterFormProps {
	setUser(user: string): void;
	setMode(mode: Mode): void;
}

const RegisterForm = (props: RegisterFormProps) => {
	const { setUser, setMode } = props;
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string>("");

	const validateEmail = (email: string): boolean => {
		// Regular expression for email validation
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailPattern.test(email);
	};

	const validatePassword = (password: string): boolean => {
		// Password should be at least 8 characters long
		return password.length >= 8;
	};

	const register = async () => {
		if (!validateEmail(email)) {
			setError("Please enter a valid email address.");
			return;
		}

		if (!validatePassword(password)) {
			setError("Password must be at least 8 characters long.");
			return;
		}

		try {
			const response = await fetch("http://localhost:3000/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email,
					password: password,
				}),
			});

			if (response.ok) {
				const data = await response.json();
				setUser(data);
				setMode(Mode.Shop);
				setError(""); // Clear error message if registration is successful
			} else {
				setError("Registration failed. Please try again."); // Set error message if registration fails
			}
		} catch (error) {
			console.error("Registration error:", error);
			setError("Registration failed. Please try again later."); // Set error message for other errors
		}
	};

	return (
		<>
			<h2>Register an account</h2>
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
