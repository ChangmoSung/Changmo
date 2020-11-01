import { GET_APPS, APPS_ERROR } from "../actions/types";

const initialState = {
  apps: [],
  app: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_APPS:
      return {
        ...state,
        apps: payload,
        loading: false,
      };
    case APPS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
