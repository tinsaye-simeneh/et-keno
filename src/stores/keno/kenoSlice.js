import { createSlice } from "@reduxjs/toolkit";
import { getKenoData, getKenoResult } from "./kenoAction";

const initialState = {
  kenoData: {},
  kenoResult: [],
  prevData: [],
  error: {
    value: false
  }
};

const KenoSlice = createSlice({
  name: "Keno",
  initialState,
  reducers: {
    setError: (state, { payload }) => {
      state.error.value = !state.error.value
    }
  },
  extraReducers: {
    [getKenoData.fulfilled]: (state, { payload }) => {
      // console.log(payload);
      if (payload !== undefined) {
        // if (state.kenoData.gameId === undefined) {
          // conditionaly set the prevous data and current data base if the KenoData has value initially
          state.prevData = payload.prevData;
          state.kenoData = payload.KenoData;
          state.kenoData['serverTime'] = payload.serverTime;
        // } else {
        //   state.kenoData = payload.KenoData;
        //   state.kenoData['serverTime'] = payload.serverTime;
        //   // state.prevData = state.kenoData;
        // }
      }
    },

    [getKenoData.rejected]: (state, { payload }) => {
      console.log("rerun")
      state.error.value = !state.error.value
    },

    [getKenoResult.fulfilled]: (state, { payload }) => {
      // console.log(payload);
      if (payload !== undefined) {
        state.kenoResult = payload;
        state.prevData.push(payload)
        
          state.prevData.shift(); // Remove the oldest element
          state.prevData.shift(); // Remove the oldest element
          state.prevData.shift(); // Remove the oldest element
      }
    },

    [getKenoResult.rejected]: (state, { payload }) => {
      state.error.value = !state.error.value
    },
  },
});

export const kenoData = (state) => state.Keno.kenoData;
export const kenoResult = (state) => state.Keno.kenoResult;
export const prevData = (state) => state.Keno.prevData;
export const error = (state) => state.Keno.error;

export const {
  setError
} = KenoSlice.actions
export default KenoSlice.reducer;
