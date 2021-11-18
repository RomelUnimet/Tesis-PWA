import { types } from '../types/types'

import Localbase from 'localbase';


const db = new Localbase('pwa-card-diary');

export const startLockStore = () => {

    return async (dispatch) => {

        //Considerar añadir un mensaje de error
        const publicKeyIDArray = await db.collection('lock').get();

        let key;

        if(publicKeyIDArray.length === 0){
            key=''
        }else{
            key = publicKeyIDArray[0]
        }

        dispatch( finishLockIdStore( key ) ); //Ver como poner eso bien

    }
}

export const createLockIdStore = ( publicKeyID ) => {

    return async (dispatch) => {


        await db.collection('lock').delete()
        await db.collection('lock').add({
            publicKeyID
        });
        
        dispatch(startLockStore())   
    }
}


const finishLockIdStore = ( publicKeyID ) =>{

    return {
        type: types.lockIDStore,
        payload: publicKeyID
    }
}