//import { fetchWithToken } from '../helpers/fetch';  
import { types } from '../types/types'

import Localbase from 'localbase';


const db = new Localbase('pwa-card-diary');

export const startTagStore = () => {

    return async (dispatch) => {

        //Considerar añadir un mensaje de error
        const tags = await db.collection('tags').get();

        dispatch( finishTagStore( tags ) );
    }
}


export const tagCreate = ( tag ) => {

    return async (dispatch) => {

        await db.collection('tags').add( tag )

        //fetchWithToken(`tag/add`, tag , 'POST');
        
        dispatch(startTagStore())   
    }
}

export const tagUpdate = ( newName, tag ) => {

    return async (dispatch) => {

        const newTag = {
            ...tag,
            name: newName,
        }

        await db.collection('tags').doc({ tid: tag.tid }).update(newTag)

        
        //fetchWithToken(`tag/${newTag.cid}`, newTag, 'PUT');
        
        dispatch(startTagStore())   
    }
}

export const tagDelete = ( tag ) => {

    return async (dispatch) => {

        await db.collection('tags').doc({ tid: tag.tid }).delete()
        
        //fetchWithToken(`tag/deletetid`, 'DELETE');
        
        dispatch(startTagStore())   
    }
}

const finishTagStore = ( tags ) =>{

    return {
        type: types.tagsStore,
        payload: tags
    }
}

