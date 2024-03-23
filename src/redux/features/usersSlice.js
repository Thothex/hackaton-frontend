import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	users: [],
	status: "idle",
};

export const fetchUsersThunk = createAsyncThunk(
	"users/fetchUsers",
	async () => {
		try {
			const res = await fetch(`${import.meta.env.VITE_BASE_URL}/users`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
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

export const updateUser = createAsyncThunk(
	"users/updateUser",
	async ({ userId, organization }) => {
		try {
			const res = await fetch(
				`${import.meta.env.VITE_BASE_URL}/user/${userId}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
					body: JSON.stringify({ organization }),
				}
			);
			if (res.status === 200) {
				const data = await res.json();

				return data;
			}
		} catch (error) {
			console.error(error);
		}
	}
);

export const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUsersThunk.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchUsersThunk.fulfilled, (state, action) => {
				state.status = "idle";
				console.log("action.payload", action.payload);
				state.users.push(
					...action.payload.map((user) => {
						return {
							key: user.id,
							userId: user.id,
							username: user.username,
							email: user.email,
							organization: user?.organizations[0] || null,
						};
					})
				);
			})
			.addCase(fetchUsersThunk.rejected, (state) => {
				state.status = "failed";
			});
		// .addCase(fetchUsersThunk.pending, (state) => {
		// 	state.status = "loading";
		// })
		// .addCase(fetchUsersThunk.fulfilled, (state, action) => {
		// 	state.status = "idle";
		// 	console.log("action.payload", action.payload);
		// })
		// .addCase(fetchUsersThunk.rejected, (state) => {
		// 	state.status = "failed";
		// });
	},
});

export default usersSlice.reducer;
