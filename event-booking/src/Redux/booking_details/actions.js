import {
    ADD_DATE_DAY,
    ADD_name,
    ADD_NAME_TIME,
    ADD_SEATS_DATA,
    ADD_TOTAL_PRICE
} from "./actionTypes"


export const handleAddEventName = (name, grade, banner_image_url) => {
    return {
        type: ADD_name,
        payload: {
            name,
            banner_image_url,
            grade
        }
    }
}

export const handleSelectDate = (date, day) => {
    return {
        type: ADD_DATE_DAY,
        payload: {
            date,
            day
        }
    }
}

export const handleSelectNameTime = (venues_name, time) => {
    return {
        type: ADD_NAME_TIME,
        payload: {
            venues_name,
            time
        }
    }
}


export const handleAddingSeatingData = (seatingData) => {
    return {
        type: ADD_SEATS_DATA,
        payload: seatingData
    }
}

export const handleAddTotalPrice = (payload) => {
    return {
        type: ADD_TOTAL_PRICE,
        payload
    }
}