import { types } from "../types/types";

const initialState = {
    entries: [],    
}

export const entryReducer = ( state = initialState, action ) => {

    switch ( action.type ) {


        case types.entriesStore:

            return {
                ...state,
                entries: action.payload,
            }

        default:
            return state;

    }
}