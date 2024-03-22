import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchTasks = createAsyncThunk(
    "tasks/fetchTask",
    async (hackathonId) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/hackathon/${hackathonId}/tasks`
                , {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
            if (!response.ok) {
                throw new Error("Failed to fetch tasks");
            }
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            throw new Error("Failed to fetch tasks");
        }
    }
);



const tasksSlice = createSlice({
    name: "tasks",
    initialState: {
        tasks: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});

export const { clearHackathon, updateHackathon } = tasksSlice.actions;
export default tasksSlice.reducer;
