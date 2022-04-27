import * as actionType from "./actionTypes";
import datpop from '../../database/db.json';
import axios from "axios";
const getEventRequest = () => {
  return {
    type: actionType.GET_EVENT_REQUEST,
  };
};

const getEventSuccess = (payload) => {
  return {
    type: actionType.GET_EVENT_SUCCESS,
    payload,
  };
};

const getEventFailure = (error) => {
  return {
    type: actionType.GET_EVENT_FAILURE,
    payload: {
      error: error,
    },
  };
};


function getobj(id){
  var object_new = {"data":datpop.events.filter(ele => ele.id == id)[0]};
  return object_new;
}

export const getEvents = (id) => (dispatch) => {
  var jsoneventdata = getobj(id);
  dispatch(getEventRequest());
  return dispatch(getEventSuccess(jsoneventdata));
};

export const putEvents = (id, param) => (dispatch) => {
  return dispatch(getEvents(id));
};