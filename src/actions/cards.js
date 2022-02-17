import { fetchWithToken } from '../helpers/fetch';  
import { types } from '../types/types'

import Localbase from 'localbase';


const db = new Localbase('pwa-card-diary');


export const startCardStore = () => {

    return async (dispatch) => {

        //Considerar añadir un mensaje de error
        const cards = await db.collection('cards').get();

        //ORDENAR EL ASUNTO //Maybe meterlo en un helper
        cards.sort(
                function(a, b) {          
                   if (a.year === b.year) {
                      // Price is only important when cities are the same
                      return a.month > b.month ? 1 : -1;
                   }
                   return a.year > b.year ? 1 : -1;
                });        

        dispatch( finishCardStore( cards ) );
    }
}

export const cardUpdateColor = ( color, card ) => {

    return async (dispatch) => {

        const newCard = {
            ...card,
            color: color,
            photo: ''
        }

        await db.collection('cards').doc({ cid: card.cid }).update(newCard)

        //Posible que haya un error aqui // Si llega a haber
        fetchWithToken(`card/${newCard.cid}`, newCard, 'PUT');
        
        dispatch(startCardStore())   
    }
}

export const cardUpdatePhoto = ( photo, card ) => {

    return async (dispatch) => {

        const newCard = {
            ...card,
            color: '',
            photo: photo
        }

        //Debo convertir la foto antes de guardarla

        await db.collection('cards').doc({ cid: card.cid }).update(newCard);

        //Posible que haya un error aqui // Si llega a haber
        fetchWithToken(`card/${newCard.cid}`, newCard, 'PUT');
        
        dispatch(startCardStore())
    }
}


const finishCardStore = ( cards ) =>{

    return {
        type: types.cardStore,
        payload: cards
    }
}