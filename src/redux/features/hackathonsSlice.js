import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

console.log("-------1");
export const fetchHackathons = createAsyncThunk(
	"hackathons/fetchHackathons",

	async () => {
		console.log("-------2");
		try {
			console.log("-------3");
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

	async () => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_BASE_URL}/hackathon`,
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
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
	reducers: {},
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

export default hackathonSlice.reducer;
