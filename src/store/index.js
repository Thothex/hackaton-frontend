import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/features/userSlice";
import dictionaryReducer from "../redux/features/dictionarySlice";
import hackathonReducer from "../redux/features/hackathonsSlice";
import tasksReducer from "../redux/features/taskSlice";
import teamReducer from "../redux/features/teamSlice";
import usersReducer from "../redux/features/usersSlice";

export const store = configureStore({
	reducer: {
		userStore: userReducer,
		hackathons: hackathonReducer,
		dictionaryStore: dictionaryReducer,
		tasks: tasksReducer,
		team: teamReducer,
		usersStore: usersReducer,
	},
});
