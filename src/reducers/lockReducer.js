import { types } from "../types/types";

const initialState = {
    publicKeyID: '',    
}

export const lockReducer = ( state = initialState, action ) => {

    switch ( action.type ) {


        case types.lockIDStore:

            return {
                ...state,
                publicKeyID: action.payload,
            } 

        default:
            return state;

    }
}