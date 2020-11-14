import { ADD_PRIVATE_APPS, USERS_ERROR } from "../actions/types.js";

const initialState = {
  users: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_PRIVATE_APPS:
      return {
        ...state,
        users: [payload, ...state.users],
        loading: false,
      };
    case USERS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
