import { Provider } from "react-redux";
import { store } from "./store/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { wsService } from "./services/websocket";
import UsernamePrompt from "./components/UsernamePrompt";
import Chat from "./components/Chat";

const AppContent = () => {
	const username = useSelector((state) => state.chat.username);

	useEffect(() => {
		if (username) {
			wsService.init(store);
		}
	}, [username]);

	if (!username) {
		return <UsernamePrompt />;
	}

	return <Chat />;
};

const App = () => {
	return (
		<Provider store={store}>
			<AppContent />
		</Provider>
	);
};

export default App;
