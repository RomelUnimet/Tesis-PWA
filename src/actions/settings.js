//import { fetchNoToken, fetchWithToken } from '../helpers/fetch'  PARA LOS UPDATES HAY QUE HACER LLAMADOS A LA BASE DE DATOS
import { types } from '../types/types'

import Localbase from 'localbase';
import { fetchWithToken } from '../helpers/fetch';


const db = new Localbase('pwa-card-diary');


export const startSettingsStore = () => {

    return async (dispatch) => {

        //Considerar añadir un mensaje de error

        const settings = await db.collection('settings').get();

        dispatch( finishSettingsStore( settings ) );
    }
}

export const updateSettings = ( newSettings ) => {

    return async (dispatch) => {

        await db.collection('settings').set([
            newSettings,
        ])

        //Posible que haya un error aqui // Si llega a haber
        fetchWithToken(`settings/${newSettings.sid}`, newSettings, 'PUT');
        
        dispatch(startSettingsStore())   
    }
}


const finishSettingsStore = ( settings ) =>{

    return {
        type:types.settStore,
        payload: settings
    }
}