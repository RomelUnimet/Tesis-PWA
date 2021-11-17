import React, { useState } from 'react'
import '../../scss/settings/settings-tabs.scss'
import { motion } from "framer-motion"
import { useNavAnimation } from '../../hooks/navAnimationHook'
import { useHistory } from 'react-router'
import Switch from "react-switch";
import { /*useDispatch,*/ useSelector } from 'react-redux'
//import { updateSettings } from '../../actions/settings'

export const LockScreen = () => {

    const [variants] = useNavAnimation('profile')

    const history = useHistory()

    const {userSettings} = useSelector(state => state.userSettings)

    //const dispatch = useDispatch()

    const [checked, setChecked] = useState(userSettings[0].auth)


    const handleAuthSwitch = async () => {

        let [newSettings] = userSettings


        //SI NO ESTA PRENDIDO ANTES DEL CAMBIO HACER EL DISPATCH
        if(!checked){
            //newSettings.auth = true;
            //dispatch( updateSettings(newSettings) )

            //Aqui debi llamar a Web Auth Api
            try {
                const options = {
                    publicKey: {
                        challenge: Uint8Array.from(
                            'UZSK85T9RFC', c => c.charCodeAt(0)),
                        rp: {
                            name: "PWACardDiary.com",
                        },
                        user: {
                            id: Uint8Array.from(newSettings.sid, c => c.charCodeAt(0)), //un error puede ser aqui
                            name: "card-diary-PWA-user@CD-PWA.com",
                            displayName: "PWA-Card-Diary-User",
                        },
                        pubKeyCredParams: [{alg: -7, type: "public-key"}],
                        authenticatorSelection: {
                            authenticatorAttachment: "platform",
                            userVerification: "preferred"
                        },
                        timeout: 60000,
                        attestation: "direct"
                    }
                };

                //Error en la autenticacion  DOMException: The relying party ID is not a registrable domain suffix of, nor equal to the current domain.
                console.log(options)
                const publicKeyCredential = await navigator.credentials.create(options);
                console.log(publicKeyCredential)

            } catch (error) {
                alert(error)
                console.log('Error en la autenticacion ',error)
            }

            

        } else {
            //newSettings.auth = false;
            //dispatch( updateSettings(newSettings) )

            /*
            try {
                
                const options = {
                    publicKey: {
                        challenge: Uint8Array.from('UZRL45T9AAC', c => c.charCodeAt(0)),  
                        allowCredentials: [
                            { type: "public-key", id: Uint8Array.from("UZSL85T9AFC", c => c.charCodeAt(0)) , transports: ["internal"] },
                            // ... more Credential IDs can be supplied.
                        ]
                    }
                };
                
                const publicKeyCredential = await navigator.credentials.get(options);
    
                console.log(publicKeyCredential)

            } catch (error) {
                
                console.log(error)

            }

            */
            
        }


        if (window.navigator && window.navigator.vibrate) {
            navigator.vibrate(100);
        } else {
            console.log('vibrar')
        }

        setChecked((s)=>!s)



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
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"
                     onClick={()=>{history.goBack()}}
                >
                    <path d="M25.3333 14.6667H9.51992L14.3599 8.85338C14.5862 8.58109 14.6951 8.23005 14.6626 7.87748C14.6301 7.52491 14.4589 7.19969 14.1866 6.97338C13.9143 6.74706 13.5633 6.63817 13.2107 6.67068C12.8581 6.70319 12.5329 6.87442 12.3066 7.14671L5.63992 15.1467C5.59507 15.2103 5.55496 15.2772 5.51992 15.3467C5.51992 15.4134 5.51992 15.4534 5.42659 15.52C5.36615 15.6729 5.33451 15.8357 5.33325 16C5.33451 16.1644 5.36615 16.3272 5.42659 16.48C5.42659 16.5467 5.42659 16.5867 5.51992 16.6534C5.55496 16.7229 5.59507 16.7897 5.63992 16.8534L12.3066 24.8534C12.4319 25.0039 12.5889 25.1249 12.7664 25.2079C12.9438 25.2908 13.1374 25.3337 13.3333 25.3334C13.6448 25.334 13.9467 25.2255 14.1866 25.0267C14.3216 24.9148 14.4332 24.7773 14.515 24.6222C14.5968 24.467 14.6472 24.2973 14.6633 24.1227C14.6794 23.948 14.6609 23.7719 14.6088 23.6045C14.5568 23.437 14.4722 23.2814 14.3599 23.1467L9.51992 17.3334H25.3333C25.6869 17.3334 26.026 17.1929 26.2761 16.9429C26.5261 16.6928 26.6666 16.3537 26.6666 16C26.6666 15.6464 26.5261 15.3073 26.2761 15.0572C26.026 14.8072 25.6869 14.6667 25.3333 14.6667Z"/>
                </svg>
                <h1> Lock </h1>
            </div>

            <div className="spacing-div-sections">

                <div className="tab-container">

                    <p>Biometric Lock</p>

                    <Switch
                        checked={checked}
                        onChange={handleAuthSwitch}
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

            </div>

        </motion.div>
    )
}
