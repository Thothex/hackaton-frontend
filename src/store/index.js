import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/features/userSlice";
import hackathonReducer from '../redux/features/hackathonsSlice';
import tasksReducer from '../redux/features/taskSlice';
export const store = configureStore({
	reducer: {
		userStore: userReducer,
		hackathons: hackathonReducer,
		tasks: tasksReducer,
	},
});
