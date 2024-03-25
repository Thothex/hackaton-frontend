import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	bearer: "",
	userInfo: {},
	status: "idle",
};

export const userLoginThunk = createAsyncThunk(
	"user/login",
	async ({ email, password }, { dispatch }) => {
		try {
			const res = await fetch(`${import.meta.env.VITE_BASE_URL}/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});
			if (res.status === 200) {
				const data = await res.json();
				localStorage.setItem("token", data.token);

				const userData = await dispatch(getUserThunk());
				return { ...data, role: userData.payload.role };
			}
		} catch (error) {
			console.error(error);
		}
	}
);

export const getUserThunk = createAsyncThunk("user/userinfo", async () => {
	try {
		const res = await fetch(`${import.meta.env.VITE_BASE_URL}/user`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});
		if (res.status === 200) {
			const data = await res.json();
			return data;
		}
		if (res.status === 401) {
			return { role: "guest", statusCode: 401 };
		}
	} catch (error) {
		console.error(error);
	}
});

export const getAllUsersThunk = createAsyncThunk(
	"users/all",
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
					"Content-Type": "application/json",
				},
			});
			if (!response.ok) {
				throw new Error("Failed to fetch users");
			}
			const data = await response.json();
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const userUpdateThunk = createAsyncThunk(
	"user/update",
	async ({ id, formData }, { dispatch }) => {
		try {
			const res = await fetch(`${import.meta.env.VITE_BASE_URL}/user/${id}`, {
				method: "PUT",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				body: formData,
			});

			if (!res.ok) {
				throw new Error("Failed to fetch hackathons");
			}
			const data = await res.json();

			const userData = await dispatch(getUserThunk());
			return { ...data, avatar: userData.payload.avatar };
		} catch (error) {
			console.error(error);
		}
	}
);

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			//loginThunk
			.addCase(userLoginThunk.pending, (state) => {
				state.status = "loading";
			})
			.addCase(userLoginThunk.fulfilled, (state, action) => {
				state.status = "idle";
				state.bearer = action.payload.token;
			})
			.addCase(userLoginThunk.rejected, (state) => {
				state.status = "failed";
			})
			// getUserThunk
			.addCase(getUserThunk.pending, (state) => {
				state.status = "loading";
			})
			.addCase(getUserThunk.fulfilled, (state, action) => {
				state.status = "idle";
				state.userInfo = { ...action.payload };
			})
			.addCase(getUserThunk.rejected, (state) => {
				state.status = "failed";
			})
			// userUpdateThunk
			.addCase(userUpdateThunk.pending, (state) => {
				state.status = "loading";
			})
			.addCase(userUpdateThunk.fulfilled, (state, action) => {
				state.status = "idle";
				state.userInfo.avatar = action.payload.avatar;
			})
			.addCase(userUpdateThunk.rejected, (state) => {
				state.status = "failed";
			})
			.addCase(getAllUsersThunk.pending, (state) => {
				state.status = "loading";
			})
			.addCase(getAllUsersThunk.fulfilled, (state, action) => {
				state.status = "idle";
				state.allUsers = action.payload;
			})
			.addCase(getAllUsersThunk.rejected, (state) => {
				state.status = "failed";
			});
	},
});

export default userSlice.reducer;
