import axios from "axios";
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

const isTokenAuthenticated = async () => {
  try {
    const endpoint =
      "https://api.games.dytech-services.com/v1/retailer/is_authenticated";

    const token = localStorage.getItem("token");

    if (!token) {
      Notification({
        message: "Session expired. Please login again.",
        type: "error",
      });
      window.location.href = "/login";
    }

    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return true;
    } else {
      Notification({
        message: "Session expired. Please login again.",
        type: "error",
      });
      window.location.href = "/login";
    }
  } catch (error) {
    Notification({
      message: "Session expired. Please login again.",
      type: "error",
    });
    window.location.href = "/login";
  }
};

export default isTokenAuthenticated;
