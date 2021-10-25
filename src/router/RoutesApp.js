import React, { useState} from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';


import { CardScreen } from '../components/cards/CardScreen';
import { CreateModal } from '../components/create_entry/CreateModal';
import { ProfileScreen } from '../components/profile/ProfileScreen';
import { CardEntries } from '../components/cards/CardEntries';
import { Navbar } from '../components/ui/Navbar'
import { SettingsScreen } from '../components/settings/SettingsScreen';
import { AnimatePresence } from 'framer-motion';
import { ProfileEdit } from '../components/profile/ProfileEdit';
import { LockScreen } from '../components/settings/LockScreen';
import { BackupRestoreScreen } from '../components/settings/BackupRestoreScreen';
import { ReminderScreen } from '../components/settings/ReminderScreen';
import { TrashScreen } from '../components/settings/trash/TrashScreen';



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
                            path="/cards/detailedcard/:id" 
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
                            path="/edit" 
                        >
                            <ProfileEdit/>
                        </Route>
                        
                        <Route
                            exact
                            path="/settings" 
                        >
                            <SettingsScreen/>
                        </Route>

                        <Route
                            exact
                            path="/backup-restore" 
                        >
                            <BackupRestoreScreen/>
                        </Route>

                        <Route
                            exact
                            path="/trash" 
                        >
                            <TrashScreen/>
                        </Route>

                        <Route
                            exact
                            path="/lock" 
                        >
                            <LockScreen/>
                        </Route>

                        <Route
                            exact
                            path="/reminder" 
                        >
                            <ReminderScreen/>
                        </Route>

   
                        <Redirect to="/cards"/>

                    </Switch>
            </div>    

            
        </>
    )

    
}
