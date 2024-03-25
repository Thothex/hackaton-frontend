import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTeamAnswer = createAsyncThunk(
	"answers/fetchTeamAnswer",
	async ({ hackathonId, teamId }) => {
		try {
			const response = await fetch(
				`${
					import.meta.env.VITE_BASE_URL
				}/answers?hackathonId=${hackathonId}&teamId=${teamId}`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);
			if (!response.ok) {
				throw new Error("Failed to fetch tasks");
			}
			const data = await response.json();
			return data;
		} catch (error) {
			throw new Error("Failed to fetch tasks");
		}
	}
);

export const saveScores = createAsyncThunk(
	"answers/setTeamAnswerScore",
	async ({ answers }) => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_BASE_URL}/answers/score`,
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ answers }),
				}
			);
			if (!response.ok) {
				throw new Error("Failed to fetch tasks");
			}
			const data = await response.json();
			return data;
		} catch (error) {
			throw new Error("Failed to fetch tasks");
		}
	}
);

const answersSlice = createSlice({
	name: "answers",
	initialState: {
		answers: [],
		loading: false,
		error: null,
	},
	reducers: {
		changeScore: (state, action) => {
			const { answerid, score } = action.payload;
			const task = state.answers.find((ans) => ans.id === answerid);
			task.score = score;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTeamAnswer.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchTeamAnswer.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.answers = action.payload;
			})
			.addCase(fetchTeamAnswer.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})

			.addCase(saveScores.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(saveScores.fulfilled, (state, action) => {
				state.loading = false;
				if (action.payload.error) {
					state.error = action.payload.error;
				} else {
					state.error = null;
				}
			})
			.addCase(saveScores.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export const { changeScore } = answersSlice.actions;
export default answersSlice.reducer;
