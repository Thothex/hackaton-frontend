import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createTeam = createAsyncThunk(
	"team/create",
	async ({ name, hackathonId }, { rejectWithValue }) => {
		try {
			const response = await fetch(`${import.meta.env.VITE_BASE_URL}/team`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name, hackathonId }),
			});
			if (!response.ok) {
				throw new Error("Failed to create team");
			}
			const data = await response.json();
			console.log(data);
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const getTeamInfo = createAsyncThunk(
	"team/info",
	async ({ hackathonId, userId }, { rejectWithValue }) => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_BASE_URL}/team/${hackathonId}/${userId}`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
						"Content-Type": "application/json",
					},
				}
			);
			if (!response.ok) {
				throw new Error("Failed to get team info");
			}
			const data = await response.json();
			console.log(data);
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const sendInvite = createAsyncThunk(
	"team/invite",
	async ({ teamId, member, hackathonId }, { rejectWithValue }) => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_BASE_URL}/team/invite`,
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ teamId, member, hackathonId }),
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
		teamInfo: null,
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
				state.teamInfo = action.payload;
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
			})
			.addCase(getTeamInfo.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.teamInfo = null;
			})
			.addCase(getTeamInfo.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.teamInfo = action.payload;
			})
			.addCase(getTeamInfo.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || action.error.message;
				state.teamInfo = null;
			});
	},
});

export default teamSlice.reducer;
