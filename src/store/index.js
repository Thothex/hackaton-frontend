import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/features/userSlice";
import hackathonReducer from '../redux/features/hackathonsSlice';
export const store = configureStore({
	reducer: {
		userStore: userReducer,
		hackathons: hackathonReducer,
	},
});
