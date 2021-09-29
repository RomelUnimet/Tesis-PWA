import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { motion } from "framer-motion"
import { useLocation } from 'react-router'
import { useLastLocation } from 'react-router-last-location'
import { useDispatch } from 'react-redux'
import { storeLastProfilePath } from '../../actions/navigation'


export const SettingsScreen = ( {usedNavbar} ) => {

    const history = useHistory()

    const lastLocation = useLastLocation();

    const SCREEN_WIDTH = window.innerWidth;

    //Navigation 

       
    const [variants, setvariants] = useState(()=>{

        if(lastLocation?.pathname.includes('/profile')){
        
            return  {
                    initial:{x:SCREEN_WIDTH, transition:{ ease:'easeOut'}},
                    in:{x:0},
                    out:{x:SCREEN_WIDTH, transition:{ ease:'easeOut'}}
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
            initial:{x:SCREEN_WIDTH, transition:{ ease:'easeOut'}},
            in:{x:0},
            out:{x:SCREEN_WIDTH, transition:{ ease:'easeOut'}}
        })
        
    }, [SCREEN_WIDTH])

    const dispatch = useDispatch()

    const {pathname} = useLocation();

    useEffect(() => {
        dispatch( storeLastProfilePath(pathname) )
    }, [dispatch, pathname])

    useEffect(() => {
        if(usedNavbar==='card'){
            setvariants({
                initial:{x:0,opacity:1, transition:{duration:0} },
                in:{x:0, opacity:1, transition:{duration:0} },
                out:{x:0, opacity:0, transition:{duration:0} }
            })
        }
    }, [usedNavbar])

    

    return (
        <motion.div 
            style={{height:'100vh', width:'100vw', position: 'absolute', top:0, zIndex:1, backgroundColor:'white'}} 
            onClick={()=>{history.push('/profile')}}
            variants={variants}
                initial="initial"
                animate="in"
                exit="out"
                transition={{type:'tween'}}
                
        >
            <h1>SETTINGS</h1>
        </motion.div>
    )
}
