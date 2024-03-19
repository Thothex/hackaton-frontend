import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchHackathons = createAsyncThunk(
    'hackathons/fetchHackathons',

    async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/hackathon`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch hackathons');
            }
            console.log('------ok')
            console.log(await response.json());

            return await response.json();
        } catch (error) {
            throw new Error('Failed to fetch hackathons');
        }
    }
);


const hackathonSlice = createSlice({
    name: 'hackathons',
    initialState: {
        hackathons: [],
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
            });
    },
});

export default hackathonSlice.reducer;
