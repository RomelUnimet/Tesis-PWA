import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { motion } from "framer-motion"
import { useLastLocation } from 'react-router-last-location'


export const SettingsScreen = () => {

    const history = useHistory()

    const lastLocation = useLastLocation();

    const SCREEN_WIDTH = window.innerWidth;
       
    const [variants, setvariants] = useState(()=>{

        if(lastLocation?.pathname.includes('/profile')){
        
            return  {
                    initial:{x:SCREEN_WIDTH},
                    in:{x:0},
                    out:{x:SCREEN_WIDTH}
                    }
        }else {
            return  {
                    initial:{x:0, transition:{duration:0} },
                    in:{x:0, transition:{duration:0} },
                    out:{x:0, transition:{duration:0} }
                    }
        }
    })

    useEffect(() => {
        setvariants({
            initial:{x:SCREEN_WIDTH},
            in:{x:0},
            out:{x:SCREEN_WIDTH}
        })
        
    }, [SCREEN_WIDTH])

    return (
        <motion.div 
            style={{height:'100vh', width:'100vw', position: 'absolute', top:0, zIndex:1, backgroundColor:'white'}} 
            onClick={()=>{history.goBack()}}
            variants={variants}
                initial="initial"
                animate="in"
                exit="out"
                transition={{ ease:'easeOut'}}
        >
            <h1>SETTINGS</h1>
        </motion.div>
    )
}
