import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { startCardStore } from '../actions/cards';
import { startSettingsStore } from '../actions/settings';
import { startGetWeather } from '../actions/extra';
import { startTagStore } from '../actions/tag'
import { startLocationStore } from '../actions/location'

import { CardScreen } from '../components/cards/CardScreen';
import { CreateModal } from '../components/create_entry/CreateModal';
import { ProfileScreen } from '../components/profile/ProfileScreen';
import { CardEntries } from '../components/cards/CardEntries';
import { Navbar } from '../components/ui/Navbar'




export const RoutesApp = () => {

    //DISPATCH PARA GURDAR EN REDUX LOS SETTINGS, CARDS Y 
    const dispatch = useDispatch();

    const [CEModalState, setCEModalState] = useState(false);

    useEffect( () => {
        
        
        dispatch( startSettingsStore() );
        dispatch( startCardStore() );
        dispatch( startTagStore() );
        dispatch( startLocationStore() );

        dispatch( startGetWeather() );


        console.log('Problema es falta de loading')
        console.log('Para no tener el doble localbase puedo hacer lo de poner el ?')
        
    },[dispatch,])

    return (
        <>
            
            <CreateModal
                CEModalState={CEModalState}
                setCEModalState={setCEModalState}
            />
        
            <div style={{position:'relative'}}>
                <Switch>
                    <Route
                        exact
                        path="/cards" 
                        component= { CardScreen }
                    />

                    <Route
                        exact
                        path="/profile" 
                        component= { ProfileScreen }
                    />
                    <Route
                        exact
                        path="/cards/:id" 
                        component= { CardEntries }
                    />

                    <Redirect to="/cards"/>

                </Switch>
            </div>    

            <Navbar
                CEModalState={CEModalState}
                setCEModalState={setCEModalState}
            />
            
            
            
        </>
    )

    
}
