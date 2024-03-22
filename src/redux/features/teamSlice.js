import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createTeam = createAsyncThunk(
    "team/create",
    async (team, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/team`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(team),
                }
            );
            if (!response.ok) {
                throw new Error("Failed to create team");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const sendInvite = createAsyncThunk(
    "team/invite",
    async ({ teamId, userId }, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/team/${teamId}/${userId}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ teamId: teamId, userId: userId }),
                }
            );
            if (!response.ok) {
                throw new Error("Failed to send invite");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const teamSlice = createSlice({
    name: "team",
    initialState: {
        loading: false,
        error: null,
        inviteData: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createTeam.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTeam.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.inviteData = action.payload;
            })
            .addCase(createTeam.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
                state.inviteData = null;
            })
            .addCase(sendInvite.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendInvite.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.inviteData = action.payload;
            })
            .addCase(sendInvite.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
                state.inviteData = null;
            });
    },
});

export default teamSlice.reducer;
