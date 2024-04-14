import { useEffect, useState } from "react";

import { Mode } from "../models";

interface ConfirmProps {
	setMode(mode: Mode): void;
}

const Confirmation = (props: ConfirmProps) => {
	const { setMode } = props;
	const [verified, setVerified] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!verified) {
			const verifySession = async () => {
				const sessionId = JSON.parse(
					localStorage.getItem("sessionId") || "null"
				);

				const response = await fetch("http://localhost:3000/verify", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ sessionId }),
				});

				const data = await response.json();
				setLoading(false);
				setVerified(data.verified ?? false);
				localStorage.removeItem("sessionId");
				localStorage.setItem("cart", JSON.stringify([]));
			};

			verifySession();
		}
	}, [verified]);

	return (
		<>
			{loading ? (
				<div className="spinner-border text-primary" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
			) : verified ? (
				<div className="alert alert-success" role="alert">
					<span>
						Purchase complete,
						<a href="#" onClick={() => setMode(Mode.Shop)}>
							return to shop?
						</a>
					</span>
				</div>
			) : (
				<div className="alert alert-danger" role="alert">
					<span>
						Purchase not completed,
						<a href="#" onClick={() => setMode(Mode.Shop)}>
							return to shop?
						</a>
					</span>
				</div>
			)}
		</>
	);
};

export default Confirmation;
