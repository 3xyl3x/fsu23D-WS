import { useEffect, useState } from "react";

import { Mode } from "../models";

interface ConfirmProps {
	setMode(mode: Mode): void;
}

const Confirmation = (props: ConfirmProps) => {
	const { setMode } = props;
	const [verified, setVerified] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (!verified) {
			const verifySession = async () => {
				let sessionId;
				const dataFromLs = localStorage.getItem("sessionId");

				if (dataFromLs) {
					sessionId = JSON.parse(dataFromLs);
				}

				const response = await fetch("http://localhost:3000/verify", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ sessionId }),
				});

				const data = await response.json();

				if (response.ok) {
					setVerified(data.verified);
					setIsLoading(false);
				}
			};

			verifySession();
		}
	}, [verified]);

	return (
		<div>
			<h3>{verified && !isLoading ? "Purchase complete" : "LOADING..."}</h3>
		</div>
	);
};

export default Confirmation;
