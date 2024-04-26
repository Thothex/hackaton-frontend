import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	dictionary: {
		categories: [],
		organizations: [],
	},
	status: "idle",
};

export const getCategoriesThunk = createAsyncThunk(
	"dictionaries/getCategories",
	async () => {
		try {
			const res = await fetch(`${import.meta.env.VITE_BASE_URL}/categories`, {
				method: "GET",
			});
			if (res.status === 200) {
				const data = await res.json();

				return data;
			}
		} catch (error) {
			console.error(error);
		}
	}
);

// export const getOrganizationsThunk = createAsyncThunk(
// 	"dictionaries/getOrganizations",
// 	async () => {
// 		try {
// 			const res = await fetch(
// 				`${import.meta.env.VITE_BASE_URL}/organizations`,
// 				{
// 					method: "GET",
// 				}
// 			);
// 			if (res.status === 200) {
// 				const data = await res.json();
//
// 				return data;
// 			}
// 		} catch (error) {
// 			console.error(error);
// 		}
// 	}
// );

export const dictionarySlice = createSlice({
	name: "dictionaryStore",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getCategoriesThunk.pending, (state) => {
				state.status = "loading";
			})
			.addCase(getCategoriesThunk.fulfilled, (state, action) => {
				state.status = "idle";
				state.dictionary.categories = action.payload;
			})
			.addCase(getCategoriesThunk.rejected, (state) => {
				state.status = "failed";
			})

			// .addCase(getOrganizationsThunk.pending, (state) => {
			// 	state.status = "loading";
			// })
			// .addCase(getOrganizationsThunk.fulfilled, (state, action) => {
			// 	state.status = "idle";
			// 	state.dictionary.organizations = action.payload;
			// })
			// .addCase(getOrganizationsThunk.rejected, (state) => {
			// 	state.status = "failed";
			// });
	},
});

export default dictionarySlice.reducer;
