import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
const initialState = {
    bearer: "",
    userInfo: {},
    status: "idle",
};
export const recoverPasswordThunk = createAsyncThunk(
    "user/recoverPasswordThunk",
    async({email}, {rejectWithValue})=>{
        try{
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/recover-email`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });
            if (!response.ok) {
                throw new Error("Failed to recover");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.message);
        }
    }
)
export const recoverPasswordEmailThunk = createAsyncThunk(
    "user/recoverPasswordEmailThunk",
    async(formData, {rejectWithValue})=>{
        try{
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/recover`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify( formData ),
            });
            if (!response.ok) {
                throw new Error("Failed to recover");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.message);
        }
    }
)
export const recoverSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(recoverPasswordThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(recoverPasswordThunk.fulfilled, (state, action) => {
                state.status = "idle";
                state.message = action.payload;
            })
            .addCase(recoverPasswordThunk.rejected, (state) => {
                state.status = "failed";
            })
            .addCase(recoverPasswordEmailThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(recoverPasswordEmailThunk.fulfilled, (state, action) => {
                state.status = "idle";
                state.message = action.payload;
            })
            .addCase(recoverPasswordEmailThunk.rejected, (state) => {
                state.status = "failed";
            })
    },
});

export default recoverSlice.reducer;
