import { types } from "../types/types";

export const storeGeolocation = ( location ) =>{

    return {
        type: types.geolocationStore,
        payload: location
    }
}