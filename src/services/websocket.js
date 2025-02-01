import {
	setIsConnected,
	setUsers,
	addMessage,
} from "../store/slices/chatSlice";

const WS_URL = "wss://web-chat-server-nl6a.onrender.com";

class WebSocketService {
	constructor() {
		this.ws = null;
		this.store = null;
	}

	init(store) {
		this.store = store;
		this.ws = new WebSocket(WS_URL);

		this.ws.onopen = () => {
			this.store.dispatch(setIsConnected(true));
			const username = this.store.getState().chat.username;
			this.send({
				type: "JOIN",
				username,
			});
		};

		this.ws.onclose = () => {
			this.store.dispatch(setIsConnected(false));
			console.log("WebSocket disconnected. Attempting to reconnect...");
			setTimeout(() => this.init(store), 3000);
		};

		this.ws.onerror = (error) => {
			console.error("WebSocket error:", error);
		};

		this.ws.onmessage = (event) => {
			const data = JSON.parse(event.data);
			switch (data.type) {
				case "USERS":
					this.store.dispatch(setUsers(data.users));
					break;
				case "MESSAGE":
					this.store.dispatch(addMessage(data));
					break;
				case "USER_JOINED":
				case "USER_LEFT":
					this.send({ type: "GET_USERS" });
					break;
				default:
					console.warn("Unknown message type:", data.type);
			}
		};
	}

	send(message) {
		if (this.ws?.readyState === WebSocket.OPEN) {
			this.ws.send(JSON.stringify(message));
		}
	}
}

export const wsService = new WebSocketService();
