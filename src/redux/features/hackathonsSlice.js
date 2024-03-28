import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchHackathons = createAsyncThunk(
	"hackathons/fetchHackathons",

	async () => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_BASE_URL}/hackathon`
			);
			if (!response.ok) {
				throw new Error("Failed to fetch hackathons");
			}
			const data = await response.json();
			console.log(data);
			return data;
		} catch (error) {
			throw new Error("Failed to fetch hackathons");
		}
	}
);

export const fetchHackathonById = createAsyncThunk(
	"hackathons/fetchHackathonById",
	async (hackathonId) => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_BASE_URL}/hackathon/${hackathonId}`
			);
			if (!response.ok) {
				throw new Error("Failed to fetch hackathon");
			}
			const data = await response.json();
			console.log(data);
			return data;
		} catch (error) {
			throw new Error("Failed to fetch hackathon");
		}
	}
);

export const createHackathon = createAsyncThunk(
	"hackathons/create",

	async (hackathon) => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_BASE_URL}/hackathon`,
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify(hackathon),
				}
			);
			if (!response.ok) {
				throw new Error("Failed to fetch hackathons");
			}
			const data = await response.json();
			return data;
		} catch (error) {
			throw new Error("Failed to fetch hackathons");
		}
	}
);

export const createNewTask = createAsyncThunk(
	"hackathons/tasks/create",
	async ({ type = "many-answers", maxScore = 10, hackathonId }) => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_BASE_URL}/hackathon/${hackathonId}/task`,
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ type, maxScore }),
				}
			);
			if (!response.ok) {
				throw new Error("Failed to fetch hackathons");
			}
			if (response.status === 201) {
				const data = await response.json();
				return { type, maxScore, id: data.id };
			}
		} catch (error) {
			throw new Error("Failed to fetch hackathons");
		}
	}
);

export const updateTask = createAsyncThunk(
	"hackathons/tasks/update",
	async ({ hackathonId, task }) => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_BASE_URL}/task/${task.id}`,
				{
					method: "PUT",
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify(task),
				}
			);
			if (!response.ok) {
				throw new Error("Failed to fetch hackathons");
			}
			return task;
		} catch (error) {
			throw new Error("Failed to fetch hackathons");
		}
	}
);

export const putHackathon = createAsyncThunk(
	"hackathons/update",

	async (hackathon) => {
		console.log("hackathon in thunk", hackathon);
		try {
			const response = await fetch(
				`${import.meta.env.VITE_BASE_URL}/hackathon/${hackathon.id}`,
				{
					method: "PUT",
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify(hackathon),
				}
			);
			if (!response.ok) {
				throw new Error("Failed to fetch hackathons");
			}
			const data = await response.json();
			return data;
		} catch (error) {
			throw new Error("Failed to fetch hackathons");
		}
	}
);

export const fetchHackathonStat = createAsyncThunk(
	"hackathons/fetchStat",

	async ({ hackathonId }) => {
		try {
			console.log("hackathon in thunk", hackathonId);
			const response = await fetch(
				`${import.meta.env.VITE_BASE_URL}/hackathon/${hackathonId}/stat`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);
			if (!response.ok) {
				throw new Error("Failed to fetch hackathon stat");
			}
			const data = await response.json();
			return data;
		} catch (error) {
			throw new Error("Failed to fetch hackathon stat");
		}
	}
);

const hackathonSlice = createSlice({
	name: "hackathons",
	initialState: {
		hackathons: [],
		hackathon: null,
		hackathonStat: {},
		currentHackathonTasks: [],
		loading: false,
		error: null,
	},
	reducers: {
		clearHackathon: (state) => {
			state.hackathon = null;
		},
		updateHackathon: (state, action) => {
			state.hackathon = action.payload;
		},
		addNewTask: (state, action) => {
			state.currentHackathonTasks.push(action.payload);
		},
		editTask: (state, action) => {
			const index = state.currentHackathonTasks.findIndex(
				(task) => task.id === action.payload.id
			);
			state.currentHackathonTasks[index] = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchHackathons.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchHackathons.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.hackathons = action.payload;
			})
			.addCase(fetchHackathons.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(fetchHackathonById.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchHackathonById.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.hackathon = action.payload;
				state.currentHackathonTasks = action.payload.tasks;
			})
			.addCase(fetchHackathonById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})

			.addCase(createNewTask.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createNewTask.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.currentHackathonTasks.push({ ...action.payload, answers: {} });
			})
			.addCase(createNewTask.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})

			.addCase(updateTask.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateTask.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				const index = state.currentHackathonTasks.findIndex(
					(task) => task.id === action.payload.id
				);
				state.currentHackathonTasks[index] = {
					...action.payload,
					answers: action.payload.answers || {},
				};
			})
			.addCase(updateTask.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(fetchHackathonStat.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchHackathonStat.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.hackathonStat = action.payload;
			})
			.addCase(fetchHackathonStat.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export const { clearHackathon, updateHackathon, addNewTask, editTask } =
	hackathonSlice.actions;
export default hackathonSlice.reducer;
