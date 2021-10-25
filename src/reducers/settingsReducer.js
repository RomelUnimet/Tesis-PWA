import { types } from "../types/types";

const initialState = {
    userSettings: [],    
}

export const settingsReducer = ( state = initialState, action ) => {

    switch ( action.type ) {


        case types.settStore:

            return {
                ...state,
                userSettings: action.payload,
            } 

        case types.settUpdate:

            return {
                ...state,
                userSettings: action.payload,
            }

        default:
            return state;

    }
}