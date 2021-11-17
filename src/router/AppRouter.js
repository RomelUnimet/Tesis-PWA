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
import { startLockStore } from '../actions/lock';

export const AppRouter = () => {

    const dispatch = useDispatch();

    useEffect( () => {
    
        dispatch( startChecking() );
        dispatch( startSettingsStore() );
        dispatch( startCardStore() );
        dispatch( startTagStore() );
        dispatch( startLocationStore() );
        dispatch( startEntryStore() );
        dispatch( startGetWeather() );
        dispatch( startLockStore() )
        
    }, [dispatch])

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