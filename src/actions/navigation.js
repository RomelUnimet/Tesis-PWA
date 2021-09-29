import { types } from "../types/types";


export const storeLastCardPath = ( path ) =>{

    return {
        type: types.lastCardPathStore,
        payload: path
    }
}

export const storeLastProfilePath = ( path ) =>{

    return {
        type: types.lastProfilePathStore,
        payload: path
    }
}