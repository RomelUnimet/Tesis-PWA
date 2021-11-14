import { types } from "../types/types";

const initialState = {
    cardTabScroll: '',   //Hacer 0 cuando se sale de el a card  
    profileScroll: '',    
    cardMemo:'',
}

export const scrollMemoReducer = ( state = initialState, action ) => {

    switch ( action.type ) {


        case types.storeMemoScrollCardTab:

            return {
                ...state,
                cardTabScroll: action.payload,
            } 
        case types.storeMemoScrollProfile:

            return {
                ...state,
                profileScroll: action.payload,
            } 
        case types.storeCardMemo:

            return {
                ...state,
                cardMemo: action.payload,
            } 

        default:
            return state;

    }
}