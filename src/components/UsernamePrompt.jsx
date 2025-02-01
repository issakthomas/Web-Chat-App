import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUsername, setTargetUser } from "../store/slices/chatSlice";
import "./UsernamePrompt.css";
import { MessageSquareText } from "lucide-react";

const UsernamePrompt = () => {
	const [localUsername, setLocalUsername] = useState("");
	const [localTargetUser, setLocalTargetUser] = useState("");
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(setUsername(localUsername));
		dispatch(setTargetUser(localTargetUser));
	};

	return (
		<div className="usernamePrompt">
			<form onSubmit={handleSubmit}>
				<h1>
					<MessageSquareText size={48} />
					Relay
				</h1>
				<input
					type="text"
					placeholder="Your username"
					value={localUsername}
					onChange={(e) => setLocalUsername(e.target.value)}
				/>
				<input
					type="text"
					placeholder="User to chat with"
					value={localTargetUser}
					onChange={(e) => setLocalTargetUser(e.target.value)}
				/>
				<button type="submit">Start Chat</button>
			</form>
		</div>
	);
};

export default UsernamePrompt;
