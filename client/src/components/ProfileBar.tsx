import { Mode } from "../models";

interface ProfileBarProps {
	user: string;
	setUser(user: string): void;
	setMode(mode: Mode): void;
}

const ProfileBar = (props: ProfileBarProps) => {
	const { user, setUser, setMode } = props;
	const logout = async () => {
		const response = await fetch("http://localhost:3000/logout", {
			method: "POST",
			credentials: "include",
		});

		if (response.status === 200) {
			setUser("");
			setMode(Mode.Login);
		}
	};
	return (
		<div className="col-12 bg-light text-center">
			<span className="fw-bold">Welcome {user}</span>
			<button className="mx-4 btn btn-danger" onClick={logout}>
				Logout
			</button>
		</div>
	);
};

export default ProfileBar;
