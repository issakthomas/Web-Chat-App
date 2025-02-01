import { CircleUserRound, SendHorizonal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { wsService } from "../services/websocket";
import "./Chat.css";

const Chat = () => {
	const [message, setMessage] = useState("");
	const { username, targetUser, messages } = useSelector(
		(state) => state.chat
	);
	const messagesContainerRef = useRef(null);

	const handleSend = () => {
		if (message.trim()) {
			wsService.send({
				type: "MESSAGE",
				content: message,
				to: targetUser,
			});
			setMessage("");
		}
	};

	useEffect(() => {
		if (messagesContainerRef.current) {
			messagesContainerRef.current.scrollTop =
				messagesContainerRef.current.scrollHeight;
		}
	}, [messages]);

	return (
		<div className="chat">
			<header>
				<span>
					<CircleUserRound />
					{targetUser}
				</span>
			</header>
			<div className="chatSection">
				<div className="messages" ref={messagesContainerRef}>
					{messages.map((msg, index) => (
						<div
							key={index}
							className={`text ${
								msg.from === username ? "our" : "their"
							}`}
						>
							{msg.content}
						</div>
					))}
				</div>
				<div className="box">
					<input
						type="text"
						placeholder="Message"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						onKeyPress={(e) => {
							if (e.key === "Enter") {
								handleSend();
							}
						}}
					/>
					<SendHorizonal onClick={handleSend} />
				</div>
			</div>
		</div>
	);
};

export default Chat;
