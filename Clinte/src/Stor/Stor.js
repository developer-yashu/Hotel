import { configureStore } from "@reduxjs/toolkit";
import hotelsReducer from "../Slice/HotelSlice";
import HotelOneReducer from "../Slice/GetOneSlice";
import wishlistSlice from '../Slice/wishlistSlice';


const Stor = configureStore({
  reducer: {
    hotels: hotelsReducer,
    HotelOne: HotelOneReducer,
    wishlist: wishlistSlice,
  },
});

export default Stor;