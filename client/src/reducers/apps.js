import {
  GET_APPS,
  ADD_APPS,
  UPDATE_APPS,
  REMOVE_APPS,
  APPS_ERROR,
} from "../actions/types";

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
    case ADD_APPS:
      return {
        ...state,
        apps: [payload, ...state.apps],
        loading: false,
      };
    case UPDATE_APPS:
      return {
        ...state,
        apps: state.apps.map((app) =>
          app._id === payload._id ? payload : app
        ),
        loading: false,
      };
    case REMOVE_APPS:
      return {
        ...state,
        apps: state.apps.filter(({ _id }) => _id !== payload),
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
