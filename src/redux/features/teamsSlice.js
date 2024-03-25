import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTeamList = createAsyncThunk(
	"teams/fetchTeamList",
	async ({ hackathonId }, { rejectWithValue }) => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_BASE_URL}/teams?hackathonId=${hackathonId}`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
						"Content-Type": "application/json",
					},
				}
			);
			const data = await response.json();
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const teamsSlice = createSlice({
	name: "teams",
	initialState: {
		teams: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTeamList.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchTeamList.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.teams = [...action.payload];
			})
			.addCase(fetchTeamList.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || action.error.message;
				state.inviteData = null;
			});
	},
});

export default teamsSlice.reducer;
