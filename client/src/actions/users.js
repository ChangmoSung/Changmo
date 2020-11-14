import axios from "axios";
import { ADD_PRIVATE_APPS, USERS_ERROR } from "./types.js";

export const addPrivateApps = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.put("/users", formData, config);
    dispatch({ type: ADD_PRIVATE_APPS, payload: res.data });
  } catch (err) {
    dispatch({
      type: USERS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
