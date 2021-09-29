import { types } from "../types/types";

const initialState = {
    lastCardPath: '',    
    lastProfilePath: '',
    navigatingTo:''    
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

        case types.navigatingToStore:

            return {
                ...state,
                navigatingTo: action.payload,
            } 

        default:
            return state;

    }
}