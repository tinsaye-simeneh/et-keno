import { Kenoaxios } from "../../services/api/axios";
import kenoResultaxios from "../../services/api/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const Notification = ({ message, type }) => {
  if (type === "error") {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

export const getKenoData = createAsyncThunk("Keno/getall", async (time) => {
  try {
    const resp = await Kenoaxios.get("", { params: { gameType: "Keno" } });
    const KenoData = resp.data.game[0];
    const serverTime = resp.data.serverTime;
    const prevData = resp.data.prevData;
    return { KenoData, serverTime, prevData };
  } catch (error) {
    if (error.response.status === 402) {
      Notification({
        message: "Session Expired, Please login first",
        type: "error",
      });
      window.location.href = "/login";
    } else {
      console.log("error on getting result", error);
    }

    throw error;
  }
});

export const getKenoResult = createAsyncThunk(
  "Keno/getKenoResult",
  async (id, thunkAPI) => {
    const kenoResultAxios = kenoResultaxios(id);

    try {
      const resp = await kenoResultAxios.get();
      const kenoResult = resp.data.result;
      return kenoResult;
    } catch (error) {
      if (error.response.status === 402) {
        Notification({
          message: "Session Expired, Please login first",
          type: "error",
        });
        window.location.href = "/login";
      } else {
        console.log(error);
      }

      throw error;
    }
  }
);
