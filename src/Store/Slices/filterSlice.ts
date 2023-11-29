import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedFilter: {},
    page: 1,
};

const Slice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        addFilter: (state, action) => {
            state.selectedFilter = action.payload;
        },
        deleteFilter: (state) => {
            state.selectedFilter = {};
        },

        addPage: (state, action) => {
            state.page = action.payload;
        }
    },
});

export const { addFilter, deleteFilter ,addPage } = Slice.actions;

export default Slice.reducer;