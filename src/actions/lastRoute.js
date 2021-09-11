import { types } from "../types/types";


export const storeLastPath = ( path ) =>{

    return {
        type: types.lastPathStore,
        payload: path
    }
}