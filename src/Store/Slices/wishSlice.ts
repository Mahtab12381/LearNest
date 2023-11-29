import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    wish: {},
    numberOfItems: 0,
};

const Slice = createSlice({
    name: "wish",
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            state.wish = action.payload;
        },
        removeFromWishlist: (state) => {
            state.wish = {
                wishlist: {},
                numberOfItems: 0
            };
        },
        addNumberOfWishlistItems: (state, action) => {
            state.numberOfItems = action.payload;
        },
    },
});

export const { addToWishlist, removeFromWishlist, addNumberOfWishlistItems } = Slice.actions;

export default Slice.reducer;
