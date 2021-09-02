import { fetchWithToken } from '../helpers/fetch';  
import { types } from '../types/types'

import Localbase from 'localbase';


const db = new Localbase('pwa-card-diary');

export const startLocationStore = () => {

    return async (dispatch) => {

        //Considerar añadir un mensaje de error
        const locations = await db.collection('locations').get();

        dispatch( finishLocationStore( locations ) );
    }
}


export const locationCreate = ( location ) => {

    return async (dispatch) => {

        await db.collection('locations').add( location )

        fetchWithToken(`location/new`, location , 'POST');
        
        dispatch(startLocationStore())   
    }
}

export const locationUpdate = ( oldLocation, newLocation ) => {

    return async (dispatch) => {

        await db.collection('locations').doc({ lid: oldLocation.lid }).update(newLocation)

        
        fetchWithToken(`location/${newLocation.lid}`, newLocation, 'PUT');
        
        dispatch(startLocationStore())   
    }
}

export const locationDelete = ( location ) => {

    return async (dispatch) => {

        await db.collection('locations').doc({ lid: location.lid }).delete()

        //Aplicar Logica del Delete dentro de la IndexedDB (Igual entre Location y Tag)
        
        fetchWithToken(`location/delete/${location.lid}`, {}, 'DELETE');
        
        dispatch(startLocationStore())   
    }
}

const finishLocationStore = ( locations ) =>{

    return {
        type: types.tagsStore,
        payload: locations
    }
}

