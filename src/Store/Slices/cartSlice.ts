import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: {},
    numberOfItems: 0,
};

const Slice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cart = action.payload;
        },
        removeFromCart: (state) => {
            state.cart = {
                cart:{},
                numberOfItems:0
            }
        },
        addNumberOfItems: (state, action) => {
            state.numberOfItems = action.payload;
        },
    },
});

export const { addToCart, removeFromCart,addNumberOfItems } = Slice.actions;

export default Slice.reducer;
