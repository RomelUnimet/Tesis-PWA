import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { startCardStore } from '../actions/cards';
import { startSettingsStore } from '../actions/settings';

import { CardScreen } from '../components/cards/CardScreen';
import { ProfileScreen } from '../components/profile/ProfileScreen';
import { Navbar } from '../components/ui/Navbar'



export const RoutesApp = () => {

    //DISPATCH PARA GURDAR EN REDUX LOS SETTINGS, CARDS Y 
    const dispatch = useDispatch();

    

    useEffect( () => {
        
        
        dispatch( startSettingsStore() );
        dispatch( startCardStore() );

        console.log('Problema es falta de loading')
        console.log('Para no tener el doble localbase puedo hacer lo de poner el ?')
        
    },[dispatch])

    return (
        <>

            <div>
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

                    <Redirect to="/cards"/>

                </Switch>
            </div>    


            <Navbar/>
            
        </>
    )
}
