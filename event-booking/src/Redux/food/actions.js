import * as actionType from "./actionTypes";
import axios from "axios";
const getFoodRequest = () => {
  return {
    type: actionType.GET_FOOD_REQUEST,
  };
};

const getFoodSuccess = (payload) => {
  return {
    type: actionType.GET_FOOD_SUCCESS,
    payload,
  };
};

const getFoodFailure = (error) => {
  return {
    type: actionType.GET_FOOD_FAILURE,
    payload: {
      error: error,
    },
  };
};


export const storeSelectedFood = (selectedFood) => {
  return {
    type: actionType.SELECTED_FOOD,
    selectedFood

  }
}

export const getFood = () => (dispatch) => {
  dispatch(getFoodRequest());
  return axios
    .get(`http://chomspro.herokuapp.com/food`)
    .then((res) => {
      console.log(res);
      dispatch(getFoodSuccess(res.data));
    })
    .catch((err) => {
      console.log(err);
      dispatch(getFoodFailure(err));
    });
};


