import axios from "axios"
import {
    GET_VENUES_FAILURE,
    GET_VENUES_REQUEST,
    GET_VENUES_SUCCESS
} from "./actionTypes"


// GET VENUES --------------------------------------------

const getVenuesRequest = () => {
    return {
        type: GET_VENUES_REQUEST
    }
}
const getVenuesSuccess = (payload) => {
    return {
        type: GET_VENUES_SUCCESS,
        payload
    }
}
const getVenuesFailure = () => {
    return {
        type: GET_VENUES_FAILURE
    }
}

export const getVenues = () => dispatch => {
    dispatch(getVenuesRequest());
    return axios.get("http://chomspro.herokuapp.com/venue")
        .then(res => {
            console.log(res.data);
            dispatch(getVenuesSuccess(res.data))})
        .catch(error => dispatch(getVenuesFailure(error)))
}