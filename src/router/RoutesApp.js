import React, { useState} from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';


import { CardScreen } from '../components/cards/CardScreen';
import { CreateModal } from '../components/create_entry/CreateModal';
import { ProfileScreen } from '../components/profile/ProfileScreen';
import { CardEntries } from '../components/cards/CardEntries';
import { Navbar } from '../components/ui/Navbar'
import { SettingsScreen } from '../components/settings/SettingsScreen';
import { AnimatePresence } from 'framer-motion';



export const RoutesApp = () => {

    //CAMBIE LOS STORES DE ESTA RUTA A LA RUTA PRINCIPAL PARA QUE NO SE LLAMARAN TANTO
    //SI HAY UN ERROR CON ESO ES MUY PROBABLE QUE SEA AHI

    const [CEModalState, setCEModalState] = useState(false);

    return (
        <>
            <AnimatePresence>
                {
                    CEModalState &&
                    <CreateModal
                        CEModalState={CEModalState}
                        setCEModalState={setCEModalState}
                    />
                }
            </AnimatePresence>

            <Navbar
                CEModalState={CEModalState}
                setCEModalState={setCEModalState}
            />
        
            <div 
                style={{width:'100vw', height:'100vh', overflow:'hidden', position:'absolute'}}
            >
                
                
                    <Switch >
                        <Route
                            exact
                            path="/cards" 
                        >
                            <CardScreen/>
                        </Route>
                           
                        <Route
                            exact
                            path="/detailedcard/:id" 
                        >
                            <CardEntries/>
                        </Route>
                            
                        <Route
                            exact
                            path="/profile" 
                        >
                            <ProfileScreen ceModalState={CEModalState}/>
                        </Route>
                        <Route
                            exact
                            path="/settings" 
                        >
                            <SettingsScreen
                            />
                        </Route>
                            
                        <Redirect to="/cards"/>

                    </Switch>
            </div>    

            
        </>
    )

    
}
