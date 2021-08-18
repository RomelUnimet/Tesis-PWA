import { fetchNoToken, fetchWithToken } from '../helpers/fetch'
import { types } from '../types/types'
//Lo haremos sin Axios para tener mas control sobre las peticiones

import Localbase from 'localbase';
import { decodeToken } from '../helpers/decodeToken';


const db = new Localbase('pwa-card-diary');


export const startLogin = ( email, password) => {

    return async ( dispatch ) => {
        
        const resp = await fetchNoToken('auth', { email, password }, 'POST');
        const body = await resp.json();

        if( body.ok){


            await db.collection('token').set([{
                token: body.token,
              }]);

            const info = await fetchWithToken('auth/info');
            
            const userInfo = await info.json();

            console.log(userInfo)

            await db.collection('settings').set(
                userInfo.settings,
              );
             
            await db.collection('cards').set(
                userInfo.cards
            );

            dispatch( login ({
                uid:body.uid,
            }))
            
            
        } else {
            console.log('Mostrar un mensaje de error')
            //Aqui debemos mostrar un mensaje de error
        }
    }  
}

export const startRegister = ( email, password) => {

    return async ( dispatch ) => {

        const resp = await fetchNoToken('auth/new', { email, password }, 'POST');
        const body = await resp.json();

        
        
        if( body.ok ){

            await db.collection('token').set([{
                token: body.token,
              }]);
            
            const settings = []
            settings.push(body.settings)

            await db.collection('settings').set(
                settings
              );

            await db.collection('cards').delete();
            
            for (let index = 0; index < body.cards.length; index++) {
                
                await db.collection('cards').add(
                    body.cards[index]
                );
    
            }

            dispatch( login ({
                uid:body.uid,
            }))

        } else {
            console.log('Mostrar un mensaje de error')
            //Aqui debemos mostrar un mensaje de error
        }
    }  
}




export const startChecking = () => {

    return async ( dispatch ) => {

        const isLogged = await db.collection('token').get();

        //Aca se muestra como si se hiciera 2 veces pero es mentira
        //Es donde se crean las colecciones en IndexedDB si no se tienen todavia
        await db.collection('cards').get();
        await db.collection('settings').get();
        await db.collection('tags').get();
        await db.collection('locations').get();

        if(isLogged.length === 0){

            const resp = await fetchWithToken('auth/renew');
            const body = await resp.json();

            if( body.ok){

                await db.collection('token').set([{
                                token: body.token,
                            }]);

                dispatch( login ({
                    uid:body.uid,
                }))
            } else {
                console.log('Body.ok dio false')
                //Aqui debemos mostrar un mensaje de error

                dispatch ( checkingFinish() )
            }

        } else {

            const token = isLogged[0].token;

            const payload = decodeToken(token);

            dispatch ( chekingToken({uid: payload.uid}) )

        }

        
    } 

}

const checkingFinish = () => {
    return { type: types.authChekingFinish }
}

const chekingToken = ( uid ) => {

    return { 
        type: types.authChekingToken,
        payload:  uid
    }
}

const login = ( user ) => {
    return {
        type: types.authLogin,
        payload: user        
    }
}




