import {
    GET_EVENTS_FAILURE,
    GET_EVENTS_REQUEST,
    GET_EVENTS_SUCCESS,
    GET_POPULAR_EVENTS_FAILURE,
    GET_POPULAR_EVENTS_REQUEST,
    GET_POPULAR_EVENTS_SUCCESS
} from "./actionTypes"
import datpop from '../../database/db.json';
import axios from "axios";



// GET EVENTS-----------------------------------

const getEventsRequest = () => {
    return {
        type: GET_EVENTS_REQUEST
    }
}
const getEventsSuccess = (payload) => {
    return {
        type: GET_EVENTS_SUCCESS,
        payload
    }
}
const getEventsFailure = (error) => {
    return {
        type: GET_EVENTS_FAILURE,
        error
    }
}

export const getEvents = () => (dispatch) => {
    dispatch(getEventsRequest);
    return axios.get("http://chomspro.herokuapp.com/events")
        .then(res => {
            console.log(res);
            let data = res.data.filter(a => a.is_popular == false);
            dispatch(getEventsSuccess(data))})
        .catch(error => dispatch(getEventsFailure(error)))
    // var filtered = datpop.events.filter(a => a.is_popular == false);
    // return dispatch(getEventsSuccess(filtered));
}



//GET POPULAR EVENTS---------------------------------------------

const getPopularEventsRequest = () => {
    return {
        type: GET_POPULAR_EVENTS_REQUEST
    }
}
const getPopularEventsSuccess = (payload) => {
    return {
        type: GET_POPULAR_EVENTS_SUCCESS,
        payload
    }
}
const getPopularEventsFailure = () => {
    return {
        type: GET_POPULAR_EVENTS_FAILURE
    }
}

export const getPopularEvents = () => dispatch => {
    dispatch(getPopularEventsRequest());
    return axios.get("http://chomspro.herokuapp.com/events")
        .then(res => {
            let data = res.data.filter(a => a.is_popular == true);
            dispatch(getPopularEventsSuccess(data))})
        .catch(error => dispatch(getPopularEventsFailure(error)))
        
}





// Auth----------------------------------------


export const storeAuth = (auth) => {
   return {type: "LOGIN-AUTH",
    auth}
}