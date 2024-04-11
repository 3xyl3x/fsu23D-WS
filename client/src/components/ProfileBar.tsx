import { Mode, User } from "../models";

interface ProfileBarProps {
	user: User;
	setUser(user: User | undefined): void;
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
			setUser(undefined);
			setMode(Mode.Login);
		}
	};
	return (
		<div className="col-12 bg-light text-center py-2">
			<span className="fw-bold">Welcome {user.name}</span>
			<button className="mx-4 btn btn-danger py-0 float-end" onClick={logout}>
				Logout
			</button>
		</div>
	);
};

export default ProfileBar;
