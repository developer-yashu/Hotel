import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch hotels
export const fetchhotels = createAsyncThunk(
  "hotels/fetch",
  async () => {
    const res = await axios.get("http://localhost:1010/api/hotels");
    return res.data;
  }
);

const hotelsSlice = createSlice({
  name: "hotels",
  initialState: {
    hotels: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchhotels.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchhotels.fulfilled, (state, action) => {
        state.loading = false;
        state.hotels = action.payload;
      })
      .addCase(fetchhotels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default hotelsSlice.reducer;