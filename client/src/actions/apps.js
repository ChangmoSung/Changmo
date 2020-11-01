import axios from "axios";
import { GET_APPS, ADD_APPS, APPS_ERROR } from "./types.js";

export const getApps = () => async (dispatch) => {
  try {
    const res = await axios.get("/apps");

    dispatch({ type: GET_APPS, payload: res.data });
  } catch (error) {
    dispatch({ type: APPS_ERROR });
  }
};

export const addApps = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post("/apps", formData, config);

    dispatch({ type: ADD_APPS, payload: res.data });
  } catch (error) {
    dispatch({ type: APPS_ERROR });
  }
};
