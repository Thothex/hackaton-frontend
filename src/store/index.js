import userReducer from "../redux/features/userSlice";
import dictionaryReducer from "../redux/features/dictionarySlice";
import hackathonReducer from "../redux/features/hackathonsSlice";
import tasksReducer from "../redux/features/taskSlice";
import teamReducer from "../redux/features/teamSlice";
import usersReducer from "../redux/features/usersSlice";
import teamsReducer from "../redux/features/teamsSlice";
import answersReducer from "../redux/features/answersSlice";
import modeReducer from "../redux/features/modeSlice.js";
import languageReducer from "@/redux/features/languageSlice";
import organizationReducer from '../redux/features/organizationsSlice';
import recoverReducer from '../redux/features/recoverSlice.js';
import {configureStore} from "@reduxjs/toolkit";
export const store = configureStore({
  reducer: {
    userStore: userReducer,
    hackathons: hackathonReducer,
    dictionaryStore: dictionaryReducer,
    tasks: tasksReducer,
    team: teamReducer,
    usersStore: usersReducer,
    teamsStore: teamsReducer,
    answersStore: answersReducer,
    mode: modeReducer,
    language: languageReducer,
    organizations : organizationReducer,
    recover:recoverReducer
  },
});
