import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/features/userSlice";
import hackathonReducer from "../redux/features/hackathonsSlice";
import dictionaryReducer from "../redux/features/dictionarySlice";

export const store = configureStore({
	reducer: {
		userStore: userReducer,
		hackathons: hackathonReducer,
		dictionaryStore: dictionaryReducer,
	},
});
