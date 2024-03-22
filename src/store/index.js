import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/features/userSlice";
import hackathonReducer from '../redux/features/hackathonsSlice';
import tasksReducer from '../redux/features/taskSlice';
import teamReducer from '../redux/features/teamSlice'
export const store = configureStore({
	reducer: {
		userStore: userReducer,
		hackathons: hackathonReducer,
		tasks: tasksReducer,
		team: teamReducer
	},
});
