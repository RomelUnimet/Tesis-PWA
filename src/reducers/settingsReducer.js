import { types } from "../types/types";

const initialState = {
    settings: [],    
}

export const settingsReducer = ( state = initialState, action ) => {

    switch ( action.type ) {


        case types.settStore:

            return {
                ...state,
                settings: action.payload,
            } 

        case types.settUpdate:

            return {
                ...state,
                settings: action.payload,
            }

        default:
            return state;

    }
}