import React, { useState } from 'react'
import '../../scss/settings/settings-tabs.scss'
import { motion } from "framer-motion"
import { useNavAnimation } from '../../hooks/navAnimationHook'
import { useHistory } from 'react-router'
import Switch from "react-switch";
import DatePicker from 'react-mobile-datepicker';
import { useDispatch, useSelector } from 'react-redux'
import { updateSettings } from '../../actions/settings'

export const ReminderScreen = () => {

    const [variants] = useNavAnimation('profile')

    const history = useHistory()

    const {userSettings} = useSelector(state => state.userSettings)

    const dispatch = useDispatch()

    //SWITCH
    const [checked, setChecked] = useState(userSettings[0].notification.active)

    const handleReminderSwitch = () => {

        let [newSettings] = userSettings
        //ESTO ME BORRA DE TOKEN DE INDEXED DB ==> DEBO SOLUCIONAR
        if(!checked){
            newSettings.notification = {
                    ...newSettings.notification,
                    active: true, 
                    time: timePickerState.time.toString()
                };
            dispatch( updateSettings(newSettings) )
        } else {
            newSettings.notification = {
                    ...newSettings.notification,
                    active: false, 
                    time: timePickerState.time.toString()
                };
            dispatch( updateSettings(newSettings) )
        }

        setChecked((s)=>!s)

        if (window.navigator && window.navigator.vibrate) {
            navigator.vibrate(100);
        } else {
            console.log('vibrar')
        }
    }

    //TIMEPICKER

    const [timePickerState, settimePickerState] = useState({
        isOpen: false,
        time: new Date(userSettings[0].notification.time)
        
    })

    const getTimeFormat = () => {

        return timePickerState.time.toLocaleString('en-US', {
            hour: 'numeric', // numeric, 2-digit
            minute: 'numeric', // numeric, 2-digit
        })
    }

    const handleClick = () => {
        settimePickerState({...timePickerState, isOpen: true });
    }
 
    const handleCancel = () => {
        settimePickerState({...timePickerState, isOpen: false });
    }
 
    const handleSelect = (time) => {
        let [newSettings] = userSettings
        newSettings.notification = {
            ...newSettings.notification,
            time: time.toString()
        };
        dispatch( updateSettings(newSettings) )
        settimePickerState({ time, isOpen: false });
    }

    const dateConfig = {
        'hour': {
            format: 'hh',
            caption: 'Hour',
            step: 1,
        },
        'minute': {
            format: 'mm',
            caption: 'Min',
            step: 1,
        },
        
    }

    return (
        <motion.div
            style={{height:'100vh', width:'100vw', position: 'absolute', top:0, zIndex:2, backgroundColor:'white'}} 
            variants={variants}
                initial="initial"
                animate="in"
                exit="out"
                transition={{type:'tween'}}
        >
            <div className="top-bar-left-center">
                <svg viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg"
                     onClick={()=>{history.goBack()}}
                     style={{transform: 'rotate(90deg)'}}
                >
                    <path fillRule="evenodd" clipRule="evenodd" d="M20.9999 2.625C21.348 2.625 21.6819 2.76328 21.928 3.00942C22.1742 3.25556 22.3124 3.5894 22.3124 3.9375V34.8941L30.5707 26.6332C30.8171 26.3868 31.1514 26.2483 31.4999 26.2483C31.8485 26.2483 32.1827 26.3868 32.4292 26.6332C32.6756 26.8797 32.8141 27.214 32.8141 27.5625C32.8141 27.911 32.6756 28.2453 32.4292 28.4918L21.9292 38.9918C21.8073 39.114 21.6624 39.211 21.503 39.2771C21.3435 39.3433 21.1726 39.3773 20.9999 39.3773C20.8273 39.3773 20.6564 39.3433 20.4969 39.2771C20.3375 39.211 20.1926 39.114 20.0707 38.9918L9.5707 28.4918C9.32425 28.2453 9.18579 27.911 9.18579 27.5625C9.18579 27.214 9.32425 26.8797 9.5707 26.6332C9.81715 26.3868 10.1514 26.2483 10.4999 26.2483C10.8485 26.2483 11.1827 26.3868 11.4292 26.6332L19.6874 34.8941V3.9375C19.6874 3.5894 19.8257 3.25556 20.0719 3.00942C20.318 2.76328 20.6519 2.625 20.9999 2.625V2.625Z"/>
                </svg>
                <h1> Reminder </h1>   
            </div>

            <div className="spacing-div-sections" >

                <div className="tab-container">

                    <p>Notifications</p>

                    <Switch
                        checked={checked}
                        onChange={handleReminderSwitch}
                        offColor="#B6B6B6"
                        onColor="#3CDAFD"
                        onHandleColor="#FFFFFF"
                        offHandleColor="#FFFFFF"
                        handleDiameter={27}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        height={30}
                        activeBoxShadow=""
                    />
                </div>
                <hr style={{margin:'0.6rem 5% 0.6rem 5%'}} />

                <div className="tab-container"
                    style={{paddingTop:'0.3rem', paddingBottom:'0.3rem'}}
                >

                    <p>Time</p>

                    <button 
                        onClick={handleClick}
                        className="time-picker-btn"
                        >
                            <p>{getTimeFormat()}</p>
                            <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.83325 13.125L17.4999 24.7917L29.1666 13.125" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                    </button>
                                    
                                    
                    <DatePicker //Tengo que separar este componente //Esto puedo cambiarlo cuando yo quiera ya que es diferente en cada interfaz
                        value={timePickerState.time}
                        isOpen={timePickerState.isOpen}
                        onSelect={handleSelect}
                        onCancel={handleCancel}
                        theme={'ios'}
                        showHeader={false}
                        confirmText={'Done'}
                        cancelText={'Close'} 
                        dateConfig={dateConfig}
                    />
                </div>

                <hr style={{margin:'0.6rem 5% 0.6rem 5%'}} />
            </div>
            

        </motion.div>
    )
}
