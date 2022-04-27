import { loadData, saveData } from "../../Utils/LocalStorage";
import {
    GET_EVENTS_FAILURE,
    GET_EVENTS_REQUEST,
    GET_EVENTS_SUCCESS,
    GET_POPULAR_EVENTS_FAILURE,
    GET_POPULAR_EVENTS_REQUEST,
    GET_POPULAR_EVENTS_SUCCESS
} from "./actionTypes"

const initState = {
    events_data: [],
    popular_events: [],
    isLoading: false,
    isError: false,
    isAuth: loadData("auth") || false
}



export const reducer = (state = initState, { type, payload, city, auth }) => {
    switch (type) {
        case GET_EVENTS_REQUEST: {
            return {
                ...state,
                isLoading: true
            }
        }
        case GET_EVENTS_SUCCESS: {
            return {
                ...state,
                events_data: payload,
                isLoading: false
            }
        }
        case GET_EVENTS_FAILURE: {
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        }
        case GET_POPULAR_EVENTS_REQUEST: {
            return {
                ...state,
                isLoading: true
            }
        }
        case GET_POPULAR_EVENTS_SUCCESS: {
            return {
                ...state,
                popular_events: payload,
                isLoading: false
            }
        }
        case GET_POPULAR_EVENTS_FAILURE: {
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        }
        case "LOGIN-AUTH": {
            const updated = { auth: auth }
            saveData("auth", updated)
            return {
                ...state,
                isAuth: updated.auth
            }
        }
        default:
            return state
    }
}