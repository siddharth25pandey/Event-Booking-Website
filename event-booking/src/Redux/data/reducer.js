import * as actionType from "./actionTypes";

const initState = {
  events: [],
  isError: false,
  isLoading: false,
};

export const eventReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.GET_EVENT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionType.GET_EVENT_SUCCESS:
      return {
        ...state,
        events: action.payload,
        isLoading: false,
      };
    case actionType.GET_EVENT_FAILURE:
      return {
        ...state,
        isError: true,
      };

    default:
      return state;
  }
};
