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

//import Localbase from 'localbase';
//import { creteOptionsObject } from '../helpers/createOptionsCredential';

import { askForPermissionToReceiveNotifications } from '../notification';


//const db = new Localbase('pwa-card-diary');


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

    /*
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
    */



    const { checking, uid } = useSelector( state => state.auth);
  
    const location = useLocation();


    if ( checking ) {
        //Componente de espera
        return (
            <div style={{width:'100%', height:'100vh', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                <svg width="200" height="200" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="62" height="62" rx="16" fill="white"/>
                    <path d="M22.0996 39.4951V42H20.6348V34.8906H23.4082C23.9421 34.8906 24.4108 34.9883 24.8145 35.1836C25.2214 35.3789 25.5339 35.6572 25.752 36.0186C25.9701 36.3766 26.0791 36.7852 26.0791 37.2441C26.0791 37.9408 25.8398 38.4909 25.3613 38.8945C24.8861 39.2949 24.2269 39.4951 23.3838 39.4951H22.0996ZM22.0996 38.3086H23.4082C23.7956 38.3086 24.0902 38.2174 24.292 38.0352C24.4971 37.8529 24.5996 37.5924 24.5996 37.2539C24.5996 36.9056 24.4971 36.624 24.292 36.4092C24.0869 36.1943 23.8037 36.0837 23.4424 36.0771H22.0996V38.3086ZM32.627 39.9492L33.584 34.8906H35.0439L33.4668 42H31.9922L30.835 37.2441L29.6777 42H28.2031L26.626 34.8906H28.0859L29.0479 39.9395L30.2197 34.8906H31.46L32.627 39.9492ZM39.6387 40.5352H37.0703L36.582 42H35.0244L37.6709 34.8906H39.0283L41.6895 42H40.1318L39.6387 40.5352ZM37.4658 39.3486H39.2432L38.3496 36.6875L37.4658 39.3486Z" fill="#3CDAFD"/>
                    <path d="M45.5455 10H16.4545C15.65 10 15 10.6703 15 11.5V50.5C15 51.3297 15.65 52 16.4545 52H45.5455C46.35 52 47 51.3297 47 50.5V11.5C47 10.6703 46.35 10 45.5455 10ZM33.7273 13.375H38.0909V23.2141L35.9773 21.625L33.7273 23.2844V13.375ZM43.7273 48.625H18.2727V13.375H31V27.2922C31 27.4469 31.0455 27.6016 31.1364 27.7281C31.1915 27.8086 31.2617 27.8769 31.3426 27.9293C31.4236 27.9816 31.5138 28.0168 31.6081 28.033C31.7024 28.0491 31.7988 28.0458 31.8918 28.0232C31.9848 28.0007 32.0726 27.9593 32.15 27.9016L35.9591 25.0938L39.6591 27.8781C39.7818 27.9719 39.9318 28.0234 40.0864 28.0234C40.4864 28.0234 40.8136 27.6859 40.8136 27.2734V13.375H43.7227V48.625H43.7273Z" fill="#3CDAFD"/>
                </svg>
                <h1 style={{color:'#3CDAFD', fontSize:'30px'}}>PWA Card Diary</h1>
            </div>
        );
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