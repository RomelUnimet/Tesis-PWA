import React, {useEffect} from 'react';
import {
    Switch,
    Redirect,
    useLocation
  } from 'react-router-dom';
  
import { useDispatch, useSelector } from 'react-redux';

import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

import { RegisterScreen } from '../components/auth/RegisterScreen'
import { startChecking } from '../actions/auth';
import { RoutesApp } from './RoutesApp';

import { AnimatePresence } from "framer-motion";

import { startCardStore } from '../actions/cards';
import { startSettingsStore } from '../actions/settings';
import { startGetWeather } from '../actions/extra';
import { startTagStore } from '../actions/tag'
import { startLocationStore } from '../actions/location'
import { startEntryStore } from '../actions/entry'

import Localbase from 'localbase';
import { creteOptionsObject } from '../helpers/createOptionsCredential';

import { askForPermissionToReceiveNotifications } from '../notification';


const db = new Localbase('pwa-card-diary');


export const AppRouter = () => {

    const dispatch = useDispatch();

    useEffect(  () => {
    
        dispatch( startChecking() );
        dispatch( startSettingsStore() );
        dispatch( startCardStore() );
        dispatch( startTagStore() );
        dispatch( startLocationStore() );
        dispatch( startEntryStore() );
        dispatch( startGetWeather() );

        //PROBAR QUE ESTO NO HACE QUE DEJE DE FUNCIONAR
        //NECESITO TAMBIEN COLOCAR ESTO AQUI PARA HACER EL CHECK CADA VEZ QUE SE ABRE LA APP
        askForPermissionToReceiveNotifications()
        
    }, [dispatch])

    useEffect(() => {
        //Funcion para trigger la Autenticacion de la pagina
        async function runAuth() {
            
            const [userSettings] = await db.collection('userSettings').get();

            if( !!userSettings && userSettings.auth && navigator.credentials && window.PublicKeyCredential){ //si no esta inicuado fa ettor
                //PONER A TRIGGER AUTH COMO UN HELPER QUE SE USE EN LOCK COMO AQUI
                try {

                    const optionsFromServer = creteOptionsObject()
        
                    const credential = await navigator.credentials.create({
                        publicKey: optionsFromServer 
                    });
        
                    console.log(credential)
        
                } catch (error) {
        
                    alert('WebAuthn Doesnt Allow to call Create if its not triggered by an user action')
                    alert(error)
                    
                }
            }
        }
                
        runAuth();
    }, [])



    const { checking, uid } = useSelector( state => state.auth);
  
    const location = useLocation();


    if ( checking ) {
        return (<h5>Espere...</h5>);
        //Componente de espera
    }

    return (
        
            <div>
                <AnimatePresence
                    
                    initial={false}
                >

                    <Switch location={location} key={location.pathname}>

                        <PublicRoute 
                            exact 
                            path="/auth" 
                            isAuthenticated={ !!uid }
                            component={RegisterScreen}
                        />

                        <PrivateRoute 
                            exact 
                            path="" 
                            isAuthenticated={ !!uid }
                            component={RoutesApp}
                        />
                        <Redirect to="" />   
                    </Switch>
                </AnimatePresence>

            </div>
        
    )
}