import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	username: "",
	targetUser: "",
	users: [],
	messages: [],
	isConnected: false,
	isWaiting: false,
};

const chatSlice = createSlice({
	name: "chat",
	initialState,
	reducers: {
		setUsername: (state, action) => {
			state.username = action.payload;
		},
		setTargetUser: (state, action) => {
			state.targetUser = action.payload;
		},
		setUsers: (state, action) => {
			state.users = action.payload;
		},
		addMessage: (state, action) => {
			state.messages.push(action.payload);
		},
		setIsConnected: (state, action) => {
			state.isConnected = action.payload;
		},
		setIsWaiting: (state, action) => {
			state.isWaiting = action.payload;
		},
	},
});

export const {
	setUsername,
	setTargetUser,
	setUsers,
	addMessage,
	setIsConnected,
	setIsWaiting,
} = chatSlice.actions;
export default chatSlice.reducer;
