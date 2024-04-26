import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
    organizations: [], // Инициализируем пустым массивом
    organization: {},
    loading: false,
    error: null,
};

export const fetchOrganizations = createAsyncThunk(
    "organizations/fetchOrganizations",
    async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/organizations`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (!response.ok) {
                throw new Error("Failed to fetch Organizations");
            }
            const data = await response.json();
            console.log('----------DATA', data, response.status)
            return data;
        } catch (error) {
            throw new Error("Failed to fetch Organizations");
        }
    }
);
export const fetchOrgOrganizations = createAsyncThunk(
    "organizations/fetchOrgOrganizations",
    async (organizerId) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/organizations/organizer/${organizerId}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (!response.ok) {
                throw new Error("Failed to fetch org Organizations");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error("Failed to fetch org Organizations");
        }
    }
);

export const fetchOneOrganization = createAsyncThunk(
    "organizations/fetchOneOrganization",
    async (organizationId) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/organizations/${organizationId}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (!response.ok) {
                throw new Error("Failed to fetch this Organization");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error("Failed to fetch this Organization");
        }
    }
);

export const deleteOrganization = createAsyncThunk(
    "organizations/deleteOrganization",
    async (organizationId) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/organizations/${organizationId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (!response.ok) {
                throw new Error("Failed to delete this organization");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error("Failed to delete this organization");
        }
    }
);
export const editOrganization = createAsyncThunk(
    "organizations/editOrganization",
    async (organizationId) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/organizations/${organizationId}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (!response.ok) {
                throw new Error("Failed to delete this organization");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error("Failed to delete this organization");
        }
    }
);
const organizationsSlice = createSlice({
    name: "organizations",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrganizations.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrganizations.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.organizations = action.payload;
            })
            .addCase(fetchOrganizations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchOrgOrganizations.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrgOrganizations.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.organizations = action.payload;
            })
            .addCase(fetchOrgOrganizations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchOneOrganization.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOneOrganization.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.organization = action.payload;
            })
            .addCase(fetchOneOrganization.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteOrganization.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteOrganization.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.organizations = state.organizations.filter(org => org.id !== action.payload);
            })
            .addCase(deleteOrganization.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(editOrganization.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editOrganization.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.organization = action.payload;
            })
            .addCase(editOrganization.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

        ;
    },
});

export default organizationsSlice.reducer;
