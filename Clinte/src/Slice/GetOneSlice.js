import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchOneHotel = createAsyncThunk(
  "hotels/fetchOne",
  async (id) => {
    const res = await axios.get(`http://localhost:1010/api/hotelsOne/${id}`);
    console.log(res);
    return res.data;
     
  }
);

const GetOneSlice = createSlice({
  name: "HotelOne",
  initialState: {
    HotelOne: [],
    loading: false,
    error: [],
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchOneHotel.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchOneHotel.fulfilled, (state, action) => {
        state.loading = false;
        state.HotelOne = action.payload;
      })

      .addCase(fetchOneHotel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
 
  },
});

export default GetOneSlice.reducer;