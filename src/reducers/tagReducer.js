import { types } from "../types/types";

const initialState = {
    tags: [],    
}

export const tagReducer = ( state = initialState, action ) => {

    switch ( action.type ) {


        case types.tagsStore:

            return {
                ...state,
                tags: action.payload,
            }

        case types.tagUpdate:

            return {
                ...state,
                tags: action.payload,
            }

        case types.tagCreate:

            return {
                ...state,
                tags: action.payload,
            }

        case types.tagDelete:

            return {
                ...state,
                tags: action.payload,
            }

        default:
            return state;

    }
}