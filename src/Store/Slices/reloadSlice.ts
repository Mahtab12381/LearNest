import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    reviewReload: false,
    supportReload: false,
    assignmentReload: false,
    profileImageReload: false,
};

const Slice = createSlice({
    name: "reload",
    initialState,
    reducers: {
        execReviewReload: (state) => {
            state.reviewReload = !state.reviewReload;
        },
        execSupportReload: (state) => {
            state.supportReload = !state.supportReload;
        },
        execAssignmentReload: (state) => {
            state.assignmentReload = !state.assignmentReload;
        },
        execProfileImageReload: (state) => {
            state.profileImageReload = !state.profileImageReload;
        },
    },
});

export const { execReviewReload,execSupportReload ,execAssignmentReload,execProfileImageReload } = Slice.actions;

export default Slice.reducer;