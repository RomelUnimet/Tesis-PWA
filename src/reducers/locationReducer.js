import { types } from "../types/types";

const initialState = {
    locations: [],    
}

export const locationReducer = ( state = initialState, action ) => {

    switch ( action.type ) {


        case types.locationsStore:

            return {
                ...state,
                locations: action.payload,
            }

        default:
            return state;

    }
}