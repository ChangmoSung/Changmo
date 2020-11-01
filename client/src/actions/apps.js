import axios from "axios";
import { GET_APPS, APPS_ERROR } from "./types.js";

export const getApps = () => async (dispatch) => {
  try {
    const res = await axios.get("/apps");

    dispatch({
      type: GET_APPS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({ type: APPS_ERROR });
  }
};
