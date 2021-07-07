import { types } from "../types/types";

const initialState = {
    weather: '',    
}

export const weatherReducer = ( state = initialState, action ) => {

    switch ( action.type ) {


        case types.weatherStore:

            return {
                ...state,
                weather: action.payload,
            } 

        default:
            return state;

    }
}