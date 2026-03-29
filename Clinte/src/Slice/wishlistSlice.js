import { createSlice } from '@reduxjs/toolkit'

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        wishlistData: [],
    },
    reducers: {
        addToWishlist: (state, action) => {
            const cartexist = state.wishlistData.find((item)=>item._id === action.payload._id);
            if (!cartexist) {
                state.wishlistData.push(action.payload);
            }
        },
        removeWishlist: (state, action) => {
            state.wishlistData = state.wishlistData.filter(
                (item) => item._id !== action.payload._id);
        },
    }
})  

export const { addToWishlist, removeWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;






