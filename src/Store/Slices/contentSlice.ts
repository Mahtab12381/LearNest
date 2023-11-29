import { createSlice } from "@reduxjs/toolkit";

const initialState = {
activatedContent: {},
};

const Slice = createSlice({
    name: "content",
    initialState,
    reducers: {
        addContent: (state, action) => {
            state.activatedContent = action.payload;
        },
        deleteContent: (state) => {
            state.activatedContent = "";
        },
    },
});

export const { addContent, deleteContent } = Slice.actions;

export default Slice.reducer;