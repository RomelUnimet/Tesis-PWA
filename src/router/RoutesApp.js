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
                            path="/profile/edit" 
                        >
                            <ProfileEdit/>
                        </Route>
                        
                        <Route
                            exact
                            path="/profile/settings" 
                        >
                            <SettingsScreen/>
                        </Route>

                        <Route
                            exact
                            path="/profile/settings/backup-restore" 
                        >
                            <BackupRestoreScreen/>
                        </Route>

                        <Route
                            exact
                            path="/profile/settings/trash" 
                        >
                            <TrashScreen/>
                        </Route>

                        <Route
                            exact
                            path="/profile/settings/lock" 
                        >
                            <LockScreen/>
                        </Route>

                        <Route
                            exact
                            path="/profile/settings/reminder" 
                        >
                            <ReminderScreen/>
                        </Route>

   
                        <Redirect to="/cards"/>

                    </Switch>
            </div>    

            
        </>
    )

    
}
