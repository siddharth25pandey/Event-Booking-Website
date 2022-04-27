import React from "react";
import {
    GET_VENUES_FAILURE,
    GET_VENUES_REQUEST,
    GET_VENUES_SUCCESS
} from "./actionTypes";

const initState = {
    isLoading: false,
    isError: false,
    venues_data: []
}

export const venuesReducer = (state = initState, {
    type,
    payload
}) => {
    switch (type) {
        case GET_VENUES_REQUEST: {
            return {
                ...state,
                isLoading: true
            }
        }
        case GET_VENUES_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                venues_data: payload
            }
        }
        case GET_VENUES_FAILURE: {
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        }
        default:
            return state
    }
}