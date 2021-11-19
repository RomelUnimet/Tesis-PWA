import React, {useEffect, useRef} from 'react';
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


const db = new Localbase('pwa-card-diary');


export const AppRouter = () => {

    const dispatch = useDispatch();

    const btnref = useRef()

    useEffect(() => {
        
    
        dispatch( startChecking() );
        dispatch( startSettingsStore() );
        dispatch( startCardStore() );
        dispatch( startTagStore() );
        dispatch( startLocationStore() );
        dispatch( startEntryStore() );
        dispatch( startGetWeather() );
        

    }, [dispatch])

   

    const handleAuth = async () => {

        const [userSettings] = await db.collection('userSettings').get();

            if( !!userSettings && userSettings.auth && navigator.credentials ){ //si no esta inicuado fa ettor
                //PONER A TRIGGER AUTH COMO UN HELPER QUE SE USE EN LOCK COMO AQUI
                try {

                    const optionsFromServer = creteOptionsObject()
        
                    const credential = await navigator.credentials.create({
                        publicKey: optionsFromServer 
                    });
        
                    console.log(credential)
        
                } catch (error) {
        
                    alert(error)
                    alert('Cant Identify')
                    
                }
            }
        
    }

    const { checking, uid } = useSelector( state => state.auth);
  
    const location = useLocation();


    if ( checking ) {

        handleAuth()

        return (
            <>
                <h5>Espere...</h5>
                <button ref={btnref} onClick={handleAuth} style={{display:'none'}}></button>
            </>
        );
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