import React, {useEffect} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from 'react-router-dom';
  
import { useDispatch, useSelector } from 'react-redux';

import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

import { RegisterScreen } from '../components/auth/RegisterScreen'
import { startChecking } from '../actions/auth';
import { RoutesApp } from './RoutesApp';





export const AppRouter = () => {

    const dispatch = useDispatch();

    useEffect( () => {
    
        dispatch( startChecking() );
        
        
    }, [dispatch])

    const { checking, uid } = useSelector( state => state.auth);
  
    if ( checking ) {
        return (<h5>Espere...</h5>);
        //Componente de espera
    }
    
    

    return (
        <Router>
            <div>
                <Switch>

                    <PublicRoute 
                        exact 
                        path="/auth" 
                        component={ RegisterScreen }
                        isAuthenticated={ !!uid }
                    />

                    <PrivateRoute 
                        exact 
                        path="" 
                        component={ RoutesApp }  
                        isAuthenticated={ !!uid }
                    />

                    <Redirect to="" />   
                </Switch>
            </div>
        </Router>
    )
}