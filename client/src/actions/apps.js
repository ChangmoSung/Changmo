import axios from "axios";
import {
  GET_APPS,
  ADD_APPS,
  UPDATE_APPS,
  REMOVE_APPS,
  APPS_ERROR,
} from "./types.js";

export const getApps = () => async (dispatch) => {
  try {
    const res = await axios.get("/apps");

    dispatch({ type: GET_APPS, payload: res.data });
  } catch (err) {
    dispatch({
      type: APPS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
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
  } catch (err) {
    dispatch({
      type: APPS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const updateApps = (appId, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.put(`/apps/${appId}`, formData, config);

    dispatch({ type: UPDATE_APPS, payload: res.data });
  } catch (err) {
    dispatch({
      type: APPS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const removeApps = (appId) => async (dispatch) => {
  try {
    await axios.delete(`/apps/${appId}`);

    dispatch({ type: REMOVE_APPS, payload: appId });
  } catch (err) {
    dispatch({
      type: APPS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
