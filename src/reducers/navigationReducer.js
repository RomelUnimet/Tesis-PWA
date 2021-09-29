import { types } from "../types/types";

const initialState = {
    lastCardPath: '',    
    lastProfilePath: '',    
}

export const navigationReducer = ( state = initialState, action ) => {

    switch ( action.type ) {

        case types.lastCardPathStore:

            return {
                ...state,
                lastCardPath: action.payload,
            } 

        case types.lastProfilePathStore:

            return {
                ...state,
                lastProfilePath: action.payload,
            } 

        default:
            return state;

    }
}