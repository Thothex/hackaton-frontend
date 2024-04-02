import i18n from "@/i18n/i18n";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: localStorage.getItem("language") || "en",
};

const languageSlice = createSlice({
  name: "language",
  initialState: initialState,
  reducers: {
    setLanguage(state, action) {
      state.language = action.payload;
      localStorage.setItem("language", state.language);
      i18n.changeLanguage(state.language);
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
