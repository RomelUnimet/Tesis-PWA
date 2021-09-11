import { types } from "../types/types";

const initialState = {
    path: '',    
}

export const pathReducer = ( state = initialState, action ) => {

    switch ( action.type ) {


        case types.lastPathStore:

            return {
                ...state,
                path: action.payload,
            } 

        default:
            return state;

    }
}