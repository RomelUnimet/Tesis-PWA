import { types } from "../types/types";

const initialState = {
    cards: [],    
}

export const cardReducer = ( state = initialState, action ) => {

    switch ( action.type ) {


        case types.cardStore:

            return {
                ...state,
                cards: action.payload,
            }

        case types.cardUpdate:

            return {
                ...state,
                cards: action.payload,
            }

        default:
            return state;

    }
}