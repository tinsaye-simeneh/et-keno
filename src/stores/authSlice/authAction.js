import { createAsyncThunk } from "@reduxjs/toolkit";
import { Loginaxios } from "../../services/api/axios";

export const LoginAction = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Loginaxios.post("", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
