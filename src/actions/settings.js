//import { fetchNoToken, fetchWithToken } from '../helpers/fetch'  PARA LOS UPDATES HAY QUE HACER LLAMADOS A LA BASE DE DATOS
import { types } from '../types/types'

import Localbase from 'localbase';


const db = new Localbase('pwa-card-diary');


export const startSettingsStore = () => {

    return async (dispatch) => {

        //Considerar añadir un mensaje de error

        const settings = await db.collection('settings').get();

        dispatch( finishSettingsStore( settings ) );
    }
}


const finishSettingsStore = ( settings ) =>{

    return {
        type:types.settStore,
        payload: settings
    }
}