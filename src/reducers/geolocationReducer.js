import { types } from "../types/types";

const initialState = {
    geolocation: {lat:0, lng:0},    
}

export const geolocationReducer = ( state = initialState, action ) => {

    switch ( action.type ) {


        case types.geolocationStore:

            return {
                ...state,
                geolocation: action.payload,
            }

        default:
            return state;

    }
}