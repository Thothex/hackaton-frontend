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

export const putHackathon = createAsyncThunk(
	"hackathons/update",

	async (hackathon) => {
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

const hackathonSlice = createSlice({
	name: "hackathons",
	initialState: {
		hackathons: [],
		hackathon: null,
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
			})
			.addCase(fetchHackathonById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export const { clearHackathon, updateHackathon } = hackathonSlice.actions;
export default hackathonSlice.reducer;
