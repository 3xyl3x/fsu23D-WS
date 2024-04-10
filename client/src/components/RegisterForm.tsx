const RegisterForm = () => {
	const register = async () => {
		const response = await fetch("http://localhost:3000/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: "testarrr@email.com",
				password: "12345678",
			}),
		});
		const data = await response.json();
		console.log(data);
	};

	return (
		<>
			<button onClick={register}>Registrera</button>
		</>
	);
};

export default RegisterForm;
